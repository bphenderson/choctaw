import {
  CmsEditable,
  type CmsComponent,
} from "@remkoj/optimizely-cms-react/rsc";
import {
  BookingBarBlockDataFragmentDoc,
  type BookingBarBlockDataFragment,
} from "@/gql/graphql";

// Static, presentational fields per the concept mockup. These are visual only —
// there is no booking engine wired up.
const fields = [
  { label: "Arrival", value: "— Select date" },
  { label: "Departure", value: "— Select date" },
  { label: "Guests", value: "Two" },
  { label: "Suite", value: "Reserve Pavilion" },
];

/**
 * Booking Bar
 * Presentational availability bar, designed to overlap the hero above it.
 */
export const BookingBarBlockComponent: CmsComponent<
  BookingBarBlockDataFragment
> = ({ data: { buttonLabel = "Check Availability" }, contentLink, ctx }) => {
  return (
    <CmsEditable
      as="div"
      className="relative z-20 -mt-12 px-5 flex justify-center"
      cmsId={contentLink.key}
      ctx={ctx}
    >
      <div className="flex w-full max-w-[1000px] flex-col bg-[#efeadf] shadow-[0_15px_40px_rgba(0,0,0,0.1)] md:flex-row">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex flex-1 flex-col justify-center border-b border-black/5 px-8 py-6 md:border-b-0 md:border-r"
          >
            <span className="mb-2 text-[9px] uppercase tracking-[2px] text-[#888]">
              {field.label}
            </span>
            <span className="font-serif text-base text-[#333]">
              {field.value}
            </span>
          </div>
        ))}
        <CmsEditable
          as="button"
          type="button"
          cmsFieldName="ButtonLabel"
          className="flex items-center justify-center bg-slate px-10 py-5 text-[11px] uppercase tracking-[2px] text-white transition-colors hover:bg-[#222] md:py-0"
          ctx={ctx}
        >
          {buttonLabel || "Check Availability"}
        </CmsEditable>
      </div>
    </CmsEditable>
  );
};
BookingBarBlockComponent.displayName = "Booking Bar (Component/BookingBarBlock)";
BookingBarBlockComponent.getDataFragment = () => [
  "BookingBarBlockData",
  BookingBarBlockDataFragmentDoc,
];

export default BookingBarBlockComponent;
