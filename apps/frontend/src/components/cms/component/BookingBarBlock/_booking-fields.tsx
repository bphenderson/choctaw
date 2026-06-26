"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Format a YYYY-MM-DD value for display (parsed as a local date to avoid TZ shift)
const formatDate = (v: string) => {
  if (!v) return "— Select date";
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const todayStr = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

const fieldShell =
  "flex flex-1 flex-col justify-center border-b border-black/5 px-8 py-6 md:border-b-0 md:border-r";
const labelCls = "mb-2 text-[9px] uppercase tracking-[2px] text-[#888]";
const valueCls = "font-serif text-base text-[#333]";

function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min: string;
  onChange: (v: string) => void;
}) {
  const id = `date-field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={`relative ${fieldShell}`}>
      <label htmlFor={id} className={labelCls}>{label}</label>
      <span className={valueCls}>{formatDate(value)}</span>
      {/* Transparent native date input fills the field and opens the picker on click */}
      <input
        id={id}
        type="date"
        aria-label={label}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const labelId = `select-label-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={fieldShell}>
      <span id={labelId} className={labelCls}>{label}</span>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          aria-labelledby={labelId}
          aria-label={label}
          className={`${valueCls} flex w-full items-center justify-between gap-2 text-left outline-none`}
        >
          <span>{value}</span>
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-[#888]" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="z-[60] mt-2 w-[var(--button-width)] min-w-[12rem] bg-[#efeadf] shadow-[0_15px_40px_rgba(0,0,0,0.15)] outline-none"
        >
          {options.map((o) => (
            <ListboxOption
              key={o}
              value={o}
              className="cursor-pointer px-6 py-3 font-serif text-base text-[#333] data-[focus]:bg-slate data-[focus]:text-white"
            >
              {o}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

export default function BookingFields({
  buttonLabel,
  guestOptions,
  suiteOptions,
  bookingUrl,
  inEditMode,
}: {
  buttonLabel: string;
  guestOptions: string[];
  suiteOptions: string[];
  bookingUrl: string;
  inEditMode?: boolean;
}) {
  const today = todayStr();
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(guestOptions[0] ?? "");
  const [suite, setSuite] = useState(suiteOptions[0] ?? "");

  const onArrival = (v: string) => {
    setArrival(v);
    // Keep departure on/after arrival
    if (departure && v && departure < v) setDeparture("");
  };

  return (
    <div className="flex w-full max-w-[1000px] flex-col bg-[#efeadf] shadow-[0_15px_40px_rgba(0,0,0,0.1)] md:flex-row">
      <DateField label="Arrival" value={arrival} min={today} onChange={onArrival} />
      <DateField
        label="Departure"
        value={departure}
        min={arrival || today}
        onChange={setDeparture}
      />
      <SelectField
        label="Guests"
        value={guests}
        options={guestOptions}
        onChange={setGuests}
      />
      <SelectField
        label="Suite"
        value={suite}
        options={suiteOptions}
        onChange={setSuite}
      />
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-epi-edit={inEditMode ? "ButtonLabel" : undefined}
        className="flex items-center justify-center bg-maroon px-10 py-5 text-[11px] uppercase tracking-[2px] text-white transition-colors hover:bg-[#5f2230] md:py-0"
      >
        {buttonLabel}
      </a>
    </div>
  );
}
