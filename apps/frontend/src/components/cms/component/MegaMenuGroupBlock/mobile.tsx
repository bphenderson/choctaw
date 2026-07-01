import 'server-only';
import { CmsContentArea, type CmsComponent } from "@remkoj/optimizely-cms-react/rsc";
import { MegaMenuGroupBlockDataFragmentDoc, type MegaMenuGroupBlockDataFragment } from "@/gql/graphql";
import { Disclosure, DisclosureButton, DisclosurePanel  } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

/**
 * Mega menu group (mobile)
 * 
 */
export const MegaMenuGroupBlockComponent : CmsComponent<MegaMenuGroupBlockDataFragment> = ({ data, ctx }) => {
    const menuName = data.MenuMenuHeading ?? data._metadata?.displayName ?? "Unnamed menu entry"
    return <Disclosure as="div">
        <DisclosureButton className="group w-full flex items-center justify-between uppercase text-[13px] font-medium tracking-[0.16em] py-[15px] border-b border-[#E4DDCF] dark:border-white/10 outline-none hover:text-azure dark:hover:text-verdansk transition-colors" data-menu-label={menuName}>
            <span>{ menuName }</span>
            <ChevronDownIcon className="w-4 transition-transform group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel data-menu-item={menuName} className="flex flex-col gap-2 py-4 pl-1">
            <CmsContentArea items={ data.MegaMenuContentArea } variant='menu' noWrapper itemWrapper={{ as: "div", className: "" }} ctx={ctx} />
        </DisclosurePanel>
    </Disclosure>
}
MegaMenuGroupBlockComponent.displayName = "Mega menu group (Component/MegaMenuGroupBlock) - Mobile"
MegaMenuGroupBlockComponent.getDataFragment = () => ['MegaMenuGroupBlockData', MegaMenuGroupBlockDataFragmentDoc]

export default MegaMenuGroupBlockComponent