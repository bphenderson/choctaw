import 'server-only'
import { ServerContext, CmsContentArea } from '@remkoj/optimizely-cms-react/rsc';
import { localeToGraphLocale } from '@remkoj/optimizely-graph-client';
import { type Locales, type InputMaybe } from '@gql/graphql';
import { getSdk } from "@/sdk";
import setupFactory from '@/components/factory';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';

import { Logo } from "./partials/_logo";
import SiteSearch from './partials/_site-search';
import MenuDrawer from './partials/_menu-drawer';
import HeaderChrome from './partials/_header-chrome';
import { Suspense } from 'react';

export type HeaderProps = {
    locale?: string;
};
  
export default async function SiteHeader({ locale }: HeaderProps) 
{
    const factory = setupFactory()
    const ctx = new ServerContext({ factory })
    const { client, locale: serverLocale = locale } = ctx
    const currentDomain = client?.siteInfo.frontendDomain
    const ctxLocale = locale ?? serverLocale
    const currentLocale = (ctxLocale ? localeToGraphLocale(ctxLocale) : undefined) as InputMaybe<Locales> | undefined

    const headerData = await getSdk().getHeaderData({
        locale: currentLocale,
        domain: currentDomain
    }).then(x => x.appLayout?.items?.at(0)).catch((e: { response: { code: string, status: number, system: { message: string, auth: string} }}) => {
        console.error(`❌ [Optimizely Graph] [Error] ${e.response.code} ${e.response.system.message} ${e.response.system.auth}`)
        return undefined
    })

    return <HeaderChrome>
        <div className="container mx-auto px-4 lg:px-8 py-6 grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: menu drawer + search */}
            <div className="flex items-center gap-4 sm:gap-6 justify-self-start">
                <MenuDrawer menuItems={ headerData?.mainMenu } />
                <Suspense><SiteSearch /></Suspense>
            </div>
            {/* Center: logo */}
            <div className="justify-self-center min-w-0">
                <Suspense fallback={<Logo />}><Logo /></Suspense>
            </div>
            {/* Right: account + service buttons (set one to "Reserve" in the CMS) */}
            <div className="flex items-center gap-3 sm:gap-5 justify-self-end">
                <Link href="#" aria-label="Account" className="flex items-center hover:opacity-70 transition-opacity">
                    <UserIcon className="w-6 h-6" />
                </Link>
                <ul className="hidden sm:flex items-center gap-3">
                    <CmsContentArea items={ headerData?.serviceButtons } noWrapper itemWrapper={{ as: "li" }} ctx={ctx} />
                </ul>
            </div>
        </div>
    </HeaderChrome>
}