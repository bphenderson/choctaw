import { type FunctionComponent, type ComponentProps } from "react";
import { CmsContentArea, ServerContext } from "@remkoj/optimizely-cms-react/rsc";
import setupFactory from "@/components/factory";
import { type LinkItemDataFragment } from "@gql/graphql";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import ThemePicker from "./_themepicker";
import PropertySelector from "./_property-selector";

export type MenuDrawerProps = {
  menuItems?: ComponentProps<typeof CmsContentArea>["items"];
  propertyLinks?: ReadonlyArray<LinkItemDataFragment | null> | null;
};

/**
 * MenuDrawer
 * Always-visible hamburger that opens the primary navigation. Per the design
 * demo, the panel is a full container-width dropdown that drops straight down
 * below the header (a cream sheet with a soft drop shadow), rather than a narrow
 * side drawer. The property switcher pill and theme picker sit at its foot.
 */
export const MenuDrawer: FunctionComponent<MenuDrawerProps> = ({ menuItems, propertyLinks }) => {
  const ctx = new ServerContext({ factory: setupFactory() });
  return (
    <Popover className="flex items-center">
      <PopoverButton
        aria-label="Open menu"
        className="flex items-center outline-none hover:opacity-70 transition-opacity"
      >
        <Bars3Icon className="w-6 h-6" />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute left-0 top-full z-[5000] w-screen origin-top transition duration-200 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-cream text-[var(--slate)] dark:bg-vulcan-85 dark:text-white shadow-[0_30px_60px_-30px_rgba(31,42,35,0.35)]">
            <div className="px-6 sm:px-10 pt-1.5 pb-6">
              <nav>
                <CmsContentArea items={menuItems} variant="mobile" ctx={ctx} />
              </nav>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <PropertySelector links={propertyLinks} />
                <ThemePicker />
              </div>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default MenuDrawer;
