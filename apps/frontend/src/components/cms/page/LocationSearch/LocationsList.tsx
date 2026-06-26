"use client";

import React from "react";
import { Location } from "./locations";

interface LocationsListProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

export function LocationsList({
  locations,
  selectedLocation,
  onLocationSelect,
}: LocationsListProps) {
  return (
    <div className="grid-container space-y-4">
      {locations.map((location, index) => (
        <div
          key={index}
          className={`grid-item p-4 border rounded-lg transition-colors ${
            selectedLocation === location
              ? "border-azure bg-azure/5"
              : "border-gray-200 hover:border-azure"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">{location.name}</h3>
          <p className="text-gray-600 m-2">{location.address}</p>
          <div className="mt-3">
            Services:
            {location.services?.map((s, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-light-grey px-2 py-1 text-xs font-medium mr-2 ring-1 ring-gray-500/10 ring-inset"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-3">
            Hours:
            <p className="text-gray-600 m-2">
              Mon-Fri 9:00 AM - 5:00 PM, Sat 10:00 AM - 2:00 PM
            </p>
          </div>

          <div className="mt-3">
            {location.atmType?.map((t, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-azure text-white px-2 py-1 text-xs font-medium mr-2 ring-1 ring-gray-500/10 ring-inset"
              >
                {t}
              </span>
            ))}
          </div>
          <p></p>

          <div className="text-sm space-x-2 mt-2">
            <a className="btn--secondary btn--cta" href={location.url}>
              <div className="btn__content">
                More Details
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </a>

            <a
              className="btn--secondary btn--cta"
              href="https://www.optimizely.com/get-started"
              onClick={(e) => {
                e.preventDefault();
                onLocationSelect(location);
              }}
            >
              <div className="btn__content">
                View on Map
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
