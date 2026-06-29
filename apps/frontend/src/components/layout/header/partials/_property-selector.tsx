import { type FunctionComponent } from "react";
import { type LinkItemDataFragment } from "@gql/graphql";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import CmsLink, { createListKey } from "@shared/cms_link";

export type PropertySelectorProps = {
  links?: ReadonlyArray<LinkItemDataFragment | null> | null;
  label?: string;
};

/**
 * PropertySelector
 * Master-brand property switcher (Durant / Pocola / Hochatown / …). Server
 * component that hands its server-rendered link list to the headless Popover —
 * the same pattern the MenuDrawer uses. Renders nothing when no properties are
 * configured on the Application Layout.
 */
export const PropertySelector: FunctionComponent<PropertySelectorProps> = ({
  links,
  label = "Our Properties",
}) => {
  const items = (links ?? []).filter(Boolean) as LinkItemDataFragment[];
  if (items.length === 0) return null;

  return (
    <Popover className="hidden items-center sm:flex">
      <PopoverButton
        aria-label="Choose a property"
        className="flex items-center gap-1.5 text-sm outline-none transition-opacity hover:opacity-70"
      >
        <MapPinIcon className="h-5 w-5" />
        <span>{label}</span>
        <ChevronDownIcon className="h-4 w-4" aria-hidden />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className="[--anchor-gap:1.5rem] z-[5000] min-w-[220px] bg-cream text-[var(--slate)] shadow-[0_14px_30px_rgba(0,0,0,0.12)] dark:bg-vulcan-85 dark:text-white"
      >
        <ul className="py-2">
          {items.map((item) => (
            <li key={createListKey(item)}>
              <CmsLink
                href={item}
                className="block px-5 py-2.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              />
            </li>
          ))}
        </ul>
      </PopoverPanel>
    </Popover>
  );
};

export default PropertySelector;
