import "server-only";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.scss";
import { Body, ThemeProvider } from "@/components/theme";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Server side components
import {
  EnvTools,
  Scripts,
  OptimizelyOneGadget,
} from "@remkoj/optimizely-one-nextjs/server";
import { getServerContext } from "@remkoj/optimizely-cms-react/rsc";

// Client side trackers
import {
  OptimizelyOneProvider,
  PageActivator,
} from "@remkoj/optimizely-one-nextjs/client";
import GoogleAnalytics from "@/components/integrations/google-analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

/* eslint-disable @next/next/no-css-tags */

const figtree = Figtree({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const domain =
    process.env.NEXT_PUBLIC_SITE_DOMAIN ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "localhost:3000";
  const scheme =
    domain && (domain.startsWith("localhost") || domain.endsWith(".local"))
      ? "http"
      : "https";
  const base = domain ? new URL(`${scheme}://${domain}`) : undefined;
  return {
    metadataBase: base,
    title: {
      default: `B&H Bank - An XCentium Demo Company`,
      template: `%s | B&H Bank - An XCentium Demo Company`,
    },
    openGraph: {
      title: {
        default: `B&H Bank - An XCentium Demo Company`,
        template: `%s | B&H Bank - An XCentium Demo Company`,
      },
      siteName: "B&H Bank",
      images: [
        {
          url: "/apple-touch-icon.png",
        },
      ],
    },
    description:
      "A Demo showcasing the power of combining the Optimizely DXP with Next.JS",
    icons: {
      apple: { sizes: "180x180", url: "/apple-touch-icon.png" },
      icon: [
        { type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
        { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      ],
    },
    manifest: "/site.webmanifest",
  };
}

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // This will obtain the server context from the page, before the first async function
  // is invoked
  const { locale } = getServerContext();

  // Allow environment control over whether the WX snippet can be changed by the client
  const forceDisableOverride = EnvTools.readValueAsBoolean(
    "DISABLE_WX_SWITCHER",
    false,
  );

  // Check if services are enabled
  const ga_id = EnvTools.readValue("GA_TRACKING_ID");
  const enableGoogleAnalytics = ga_id && ga_id.trim() != "";
  const enableDemoTools = EnvTools.readValueAsBoolean(
    "OPTIMIZELY_ONE_HELPER",
    false,
  );

  return (
    <html lang={locale}>
      <head>
        {/* Microsoft Verification - Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="A55B465610E9BE87BE6C4FD0F0BC1533" />

        <Scripts.Header experimentationAllowOverride={!forceDisableOverride} />
        {enableDemoTools && (
          <link key="dynamic-styles" rel="stylesheet" href="/main.css"></link>
        )}

        {/* Cookie Consent - Script to load opti web experimentation */}
        <Script
          id="optimizely-one"
          src="https://cdn.optimizely.com/js/5663395660169216.js"
          strategy="afterInteractive"
        />

        {/* Cookie Consent - Script to load popper.js */}
        <Script
          id="cookie-consent-loader"
          src="https://cookieconsent.popupsmart.com/src/js/popper.js"
          strategy="afterInteractive"
        />
        {/* Cookie Consent - Initialization script */}
        <Script
          id="cookie-consent-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                // Check if start object exists and initialize
                (function initializeConsent() {
                  if (window.start && typeof window.start.init === 'function') {
                    window.start.init({
                      Palette: "palette6",
                      Mode: "floating left",
                      Theme: "wire",
                      Time: "5",
                    });
                  } else {
                    // If not ready yet, try again in 100ms
                    setTimeout(initializeConsent, 100);
                  }
                })();
              `,
          }}
        />
      </head>
      <ThemeProvider value={{ theme: "system" }}>
        <Body
          className={`${figtree.className} on-ghost-white overflow-x-hidden`}
        >
          <OptimizelyOneProvider value={{ debug: false }}>
            <PageActivator />
            <div className="flex min-h-screen flex-col justify-between">
              <div className="global-alert">
                Introducing XCentium&apos;s Financial Services Accelerator,
                powered by Optimizely SaaS.
              </div>

              <Header />
              <main className="grow">{children}</main>
              <Footer />
            </div>
            <OptimizelyOneGadget />
          </OptimizelyOneProvider>
          <Scripts.Footer />
          {enableGoogleAnalytics && <GoogleAnalytics measurementId={ga_id} />}
          <SpeedInsights />
          <Script
            id="hs-script-loader"
            src="//js-na1.hs-scripts.com/49716845.js"
            strategy="lazyOnload"
            async
            defer
          />
        </Body>
      </ThemeProvider>
    </html>
  );
}
