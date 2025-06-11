"use client";
import {
  useId,
  useState,
  useEffect,
  type FunctionComponent,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import {
  Field,
  Label,
  Listbox,
  ListboxButton as HeadlessListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export type DropDownOption = {
  value: string;
  label?: string;
};

type MultiSelectDropDownProps = {
  options: DropDownOption[];
  values?: DropDownOption[];
  label: string;
  onChange?: (values: DropDownOption[]) => void;
  compact?: boolean;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onChange"
>;

export const MultiSelectDropdown: FunctionComponent<
  MultiSelectDropDownProps
> = ({
  options = [],
  values = [],
  label,
  compact = false,
  onChange,
  ...divProps
}): JSX.Element => {
  const id = useId();
  const [selectedValues, setSelectedValues] =
    useState<DropDownOption[]>(values);

  useEffect(() => setSelectedValues(values), [values]);

  const toggleValue = (option: DropDownOption) => {
    const exists = selectedValues.some((v) => v.value === option.value);
    const newValues = exists
      ? selectedValues.filter((v) => v.value !== option.value)
      : [...selectedValues, option];

    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  const valueLabels =
    selectedValues.length > 0 ? "Filters Applied" : "None selected";

  const button = compact ? (
    <ListboxButton className="min-w-40 flex items-center gap-2 pl-2 border-azure border-2 rounded-lg">
      <Label className="italic">{label}:</Label>
      <span>{valueLabels}</span>
      <ChevronDownIcon className="w-5 h-5 text-azure ml-auto" />
    </ListboxButton>
  ) : (
    <ListboxButton className="border-azure border-solid border-2 outline-none focus:outline-dashed focus:outline-offset-2 focus:outline-2 focus:outline-azure focus:dark:outline-verdansk rounded-xl min-w-48 flex flex-row justify-between items-stretch dark:border-verdansk overflow-hidden">
      <div className="flex flex-col justify-between gap-2 m-2 flex-auto">
        <Label className="text-start italic">{label}</Label>
        <span className="text-start">{valueLabels}</span>
      </div>

      <div className="bg-azure text-ghost-white px-2 flex flex-col justify-center dark:bg-verdansk dark:text-vulcan">
        <ChevronDownIcon className="w-6 h-6 text-white" />
      </div>
    </ListboxButton>
  );

  return (
    <Field {...divProps}>
      <Listbox value={selectedValues} onChange={() => {}} multiple>
        {button}
        <ListboxOptions
          anchor="bottom start"
          className="bg-ghost-white border-azure border-2 rounded-xl mt-2 min-w-40 p-1"
        >
          {options.map((option) => {
            const selected = selectedValues.some(
              (v) => v.value === option.value,
            );
            return (
              <ListboxOption
                key={id + option.value}
                value={option}
                as="div"
                className="cursor-pointer px-2 py-1 flex items-center gap-2 hover:bg-azure hover:text-white"
                onClick={() => toggleValue(option)}
              >
                <input type="checkbox" checked={selected} readOnly />
                {option.label ?? option.value}
                {selected && <CheckIcon className="w-4 h-4 ml-auto" />}
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

export default MultiSelectDropdown;
