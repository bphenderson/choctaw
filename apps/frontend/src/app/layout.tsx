import "server-only";
import type { Metadata } from "next";
import { Figtree, Cormorant_Garamond } from "next/font/google";
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

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

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
      default: `Choctaw Casinos & Resorts - An XCentium Demo`,
      template: `%s | Choctaw Casinos & Resorts - An XCentium Demo`,
    },
    openGraph: {
      title: {
        default: `Choctaw Casinos & Resorts - An XCentium Demo Company`,
        template: `%s | Choctaw Casinos & Resorts - An XCentium Demo`,
      },
      siteName: "Choctaw Casinos & Resorts",
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
    <html lang={locale || "en"}>
      <head>
        {/* Microsoft Verification - Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="A55B465610E9BE87BE6C4FD0F0BC1533" />

        <Scripts.Header experimentationAllowOverride={!forceDisableOverride} />
        {enableDemoTools && (
          <link key="dynamic-styles" rel="stylesheet" href="/main.css"></link>
        )}

        {/* Experimentation - Script to load Optimizely Web Experimentation */}
        <Script
          id="optimizely-one"
          src="https://cdn.optimizely.com/js/6070980695556096.js"
          strategy="afterInteractive"
        />

        {/* Cookie Consent - Script to load popper.js */}
        {/* <Script
          id="cookie-consent-loader"
          src="https://cookieconsent.popupsmart.com/src/js/popper.js"
          strategy="afterInteractive"
        /> */}
        {/* Cookie Consent - Initialization script */}
        {/* <Script
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
        /> */}
      </head>
      <ThemeProvider value={{ theme: "system" }}>
        <Body
          className={`${figtree.variable} ${cormorant.variable} ${figtree.className} on-ghost-white overflow-x-hidden`}
        >
          <OptimizelyOneProvider value={{ debug: false }}>
            <PageActivator />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-vulcan focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-2 focus:outline-azure"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col justify-between">
              <div className="relative flex grow flex-col">
                <Header />
                <main id="main-content" className="grow">{children}</main>
              </div>
              <Footer />
            </div>
            <OptimizelyOneGadget />
          </OptimizelyOneProvider>
          <Scripts.Footer />
          {enableGoogleAnalytics && <GoogleAnalytics measurementId={ga_id} />}
          <SpeedInsights />
          {/* HubSpot — commented out to reduce third-party cookies (re-enable for marketing analytics)
          <Script
            id="hs-script-loader"
            src="//js-na1.hs-scripts.com/49716845.js"
            strategy="lazyOnload"
            async
            defer
          />
          */}
        </Body>
      </ThemeProvider>
    </html>
  );
}
