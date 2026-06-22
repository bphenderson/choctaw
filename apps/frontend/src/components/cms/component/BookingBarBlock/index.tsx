import {
  CmsEditable,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  BookingBarBlockDataFragmentDoc,
  type BookingBarBlockDataFragment,
} from "@/gql/graphql";
import BookingFields from "./_booking-fields";

const DEFAULT_BOOKING_URL =
  "https://book.rguest.com/onecart/wbe/offers/1180/Choctaw-Durant-Book";
const DEFAULT_GUEST_OPTIONS = ["One", "Two", "Three", "Four"];
const DEFAULT_SUITE_OPTIONS = ["Reserve Pavilion", "Standard Room", "Luxury Suite"];

// Split a newline- or comma-separated option list; fall back to defaults.
const parseOptions = (raw: string | null | undefined, fallback: string[]) => {
  const parsed = (raw ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parsed.length ? parsed : fallback;
};

/**
 * Booking Bar
 * Availability bar designed to overlap the hero above it. Arrival/Departure are
 * date pickers; Guests/Suite are CMS-configurable dropdowns; the button links
 * to the configured booking URL.
 */
export const BookingBarBlockComponent: CmsComponent<
  BookingBarBlockDataFragment
> = ({
  data: { buttonLabel = "Check Availability", guestOptions, suiteOptions, bookingUrl },
  inEditMode,
  contentLink,
  ctx,
}) => {
  return (
    <CmsEditable
      as="div"
      className="relative z-20 -mt-12 px-5 flex justify-center"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      <BookingFields
        buttonLabel={buttonLabel || "Check Availability"}
        guestOptions={parseOptions(guestOptions, DEFAULT_GUEST_OPTIONS)}
        suiteOptions={parseOptions(suiteOptions, DEFAULT_SUITE_OPTIONS)}
        bookingUrl={bookingUrl || DEFAULT_BOOKING_URL}
        inEditMode={inEditMode}
      />
    </CmsEditable>
  );
};
BookingBarBlockComponent.displayName = "Booking Bar (Component/BookingBarBlock)";
BookingBarBlockComponent.getDataFragment = () => [
  "BookingBarBlockData",
  BookingBarBlockDataFragmentDoc,
];

export default BookingBarBlockComponent;
