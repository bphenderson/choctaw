import { getSdk } from "@/sdk";
import { Locales } from "@gql/graphql";
import {
  ServerContext,
  CmsContentArea,
  RichText,
} from "@remkoj/optimizely-cms-react/rsc";
import { localeToGraphLocale } from "@remkoj/optimizely-graph-client";
import Image from "next/image";
import setupFactory from '@/components/factory';
import CmsLink, { createListKey } from "@shared/cms_link";
import LanguageSwitcher from "@shared/language_switcher";
import { sanitizeRichText } from "@/lib/sanitize-rich-text";

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
      style={{ backgroundColor: "#373a40" }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 w-full">
          <section className="">
            <div className="pb-1 uppercase font-bold">
              {footerData?.contactInfoHeading ?? ""}
            </div>
            <RichText
              className="prose prose-a:text-white prose-a:hover:text-azure"
              text={sanitizeRichText(footerData?.contactInfo?.json)}
              factory={factory}
              ctx={ctx}
            />
          </section>
          <CmsContentArea
            items={footerData?.footerMenus}
            variant="footer"
            noWrapper
            itemWrapper={{
              as: "nav",
              className: "",
            }}
            ctx={ctx}
          />
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-fit py-6 xl:py-12">
          <Image
            src={"/assets/XC-Innovations13x.webp"}
            width={200}
            height={35}
            alt="Moseybank Logo"
            unoptimized
            // style={{ WebkitFilter: "invert(100%);", filter: "invert(100%);" }}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 text-sm items-center justify-center">
          <p>
            {footerData?.copyright ?? "&copy; Optimizely. All rights reserved"}
          </p>
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
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
