import { type FunctionComponent, type ComponentProps } from "react";
import { CmsContentArea, ServerContext } from "@remkoj/optimizely-cms-react/rsc";
import setupFactory from "@/components/factory";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import ThemePicker from "./_themepicker";

export type MenuDrawerProps = {
  menuItems?: ComponentProps<typeof CmsContentArea>["items"];
};

/**
 * MenuDrawer
 * Always-visible hamburger that opens a drawer with the primary navigation.
 * The header uses hamburger-only nav at every breakpoint (per the mockup), so
 * this replaces the old desktop horizontal menu + mobile-only menu.
 */
export const MenuDrawer: FunctionComponent<MenuDrawerProps> = ({ menuItems }) => {
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
        anchor="bottom start"
        className="[--anchor-gap:1.5rem] z-[5000] w-screen max-w-sm bg-cream text-[var(--slate)] dark:bg-vulcan-85 dark:text-white shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="p-8">
          <CmsContentArea items={menuItems} variant="mobile" ctx={ctx} />
          <hr className="my-6 border-black/10" />
          <ThemePicker />
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default MenuDrawer;
