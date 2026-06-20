#!/usr/bin/env node
// Push Optimizely content types to the GA /v1 CMS Management API.
//
// Why this exists: the @remkoj/optimizely-cms-cli (5.3.x) `types:push` targets
// the deprecated /preview3 endpoint, pushes the legacy content-type model, and
// fires ~40 concurrent OAuth requests that trip undici's connect timeout. This
// script talks to the GA /v1 API directly, sequentially, in the wire model the
// API actually accepts (baseType "_component", richText, isLocalized/isRequired).
//
// Usage:
//   node scripts/push-content-types.mjs            # create/update all types
//   node scripts/push-content-types.mjs --dry-run  # show plan, no writes
//
// Credentials are read from process.env first, then apps/frontend/.env.local:
//   OPTIMIZELY_CMS_CLIENT_ID, OPTIMIZELY_CMS_CLIENT_SECRET
// Optional: OPTIMIZELY_CMS_API_BASE (default https://api.cms.optimizely.com)

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = resolve(__dirname, "..");
const COMPONENTS_DIR = join(FRONTEND_ROOT, "src", "components", "cms");
const DRY_RUN = process.argv.includes("--dry-run");

const API_BASE = (process.env.OPTIMIZELY_CMS_API_BASE || "https://api.cms.optimizely.com").replace(/\/$/, "");

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(FRONTEND_ROOT, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq < 0) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim();
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {
    /* no .env.local — rely on process.env */
  }
}

function findTypeFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...findTypeFiles(full));
    else if (name.endsWith(".opti-type.json")) out.push(full);
  }
  return out;
}

async function getToken(clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  const res = await fetch(`${API_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function pushOne(token, def) {
  const key = def.key;
  const auth = { Authorization: `Bearer ${token}` };

  const existing = await fetch(`${API_BASE}/v1/contenttypes/${key}`, { headers: auth });
  const exists = existing.status === 200;
  if (existing.status !== 200 && existing.status !== 404) {
    return { key, action: "check", ok: false, msg: `GET ${existing.status}: ${(await existing.text()).slice(0, 160)}` };
  }

  if (DRY_RUN) return { key, action: exists ? "would-update" : "would-create", ok: true, msg: "" };

  const res = exists
    ? await fetch(`${API_BASE}/v1/contenttypes/${key}`, {
        method: "PATCH",
        headers: { ...auth, "Content-Type": "application/merge-patch+json" },
        body: JSON.stringify(def),
      })
    : await fetch(`${API_BASE}/v1/contenttypes`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify(def),
      });

  const ok = res.ok; // 200/201/204
  return {
    key,
    action: exists ? "update" : "create",
    ok,
    msg: ok ? `${res.status}` : `${res.status}: ${(await res.text()).slice(0, 220)}`,
  };
}

async function main() {
  loadEnvLocal();
  const clientId = process.env.OPTIMIZELY_CMS_CLIENT_ID;
  const clientSecret = process.env.OPTIMIZELY_CMS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error("Missing OPTIMIZELY_CMS_CLIENT_ID / OPTIMIZELY_CMS_CLIENT_SECRET");
    process.exit(2);
  }

  const files = findTypeFiles(COMPONENTS_DIR).sort();
  console.log(`Pushing ${files.length} content types to ${API_BASE}/v1${DRY_RUN ? " (dry run)" : ""}\n`);

  const token = await getToken(clientId, clientSecret);
  const results = [];
  for (const file of files) {
    const def = JSON.parse(readFileSync(file, "utf8"));
    let r;
    try {
      r = await pushOne(token, def);
    } catch (e) {
      r = { key: def.key, action: "error", ok: false, msg: e.cause?.code || e.message };
    }
    results.push(r);
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.key.padEnd(34)} ${r.action.padEnd(12)} ${r.msg}`);
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\nDone: ${results.length - failed.length}/${results.length} ok` + (failed.length ? `, ${failed.length} failed` : ""));
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
