import { getSdk } from "@/sdk";
import { Locales } from "@gql/graphql";
import {
  ServerContext,
  CmsContentArea,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";
import setupFactory from '@/components/factory';
import CmsLink, { createListKey } from "@shared/cms_link";
import LanguageSwitcher from "@shared/language_switcher";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import { Logo } from "@/components/layout/header/partials/_logo";

export type SiteFooterProps = {
  locale?: string;
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const sdk = getSdk();
  const factory = setupFactory();
  const ctx = new ServerContext({ factory });
  const { locale: contextLocale } = ctx;
  const footerLocale = locale ?? contextLocale;
  const footerData = (
    await sdk
      .getFooterData({
        locale: footerLocale
          ? (localeToGraphLocale(footerLocale) as Locales)
          : Locales.ALL,
      })
      .catch(
        (e: {
          response: {
            code: string;
            status: number;
            system: { message: string; auth: string };
          };
        }) => {
          console.error(
            `❌ [Optimizely Graph] [Error] ${e.response.code} ${e.response.system.message} ${e.response.system.auth}`,
          );
          return undefined;
        },
      )
  )?.appLayout?.items?.at(0);

  return (
    <footer
      className="bg-vulcan dark:bg-vulcan-85 text-white py-8 lg:py-16 outer-padding"
      style={{ backgroundColor: "#23262E" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 pb-12 lg:flex-row lg:justify-between lg:gap-8">
          {/* Brand */}
          <div className="footer-brand max-w-xs">
            <Logo />
            <RichText
              className="prose prose-sm mt-6 max-w-none font-light leading-7 prose-p:text-white/70 prose-a:text-white"
              text={sanitizeRichText(footerData?.contactInfo?.json)}
              factory={factory}
              ctx={ctx}
            />
          </div>
          {/* Link columns */}
          <div className="flex flex-wrap gap-10 sm:gap-16 lg:gap-20">
            <CmsContentArea
              items={footerData?.footerMenus}
              variant="footer"
              noWrapper
              itemWrapper={{ as: "nav" }}
              ctx={ctx}
            />
          </div>
        </div>
        {/* Divider + bottom bar */}
        <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[2px] text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footerData?.copyright ?? "© Choctaw Casinos & Resorts"}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ul className="flex flex-row gap-6">
              {footerData?.legalLinks?.map(
                (linkItem) =>
                  linkItem && (
                    <li key={createListKey(linkItem)}>
                      <CmsLink href={linkItem} />
                    </li>
                  ),
              )}
            </ul>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
