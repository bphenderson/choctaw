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
          <p className="text-gray-600 mb-2">{location.address}</p>
          <p className="text-gray-600 mb-2">
            Hours: Mon-Fri 9:00 AM - 5:00 PM, Sat 10:00 AM - 2:00 PM
          </p>
          <p className="text-sm space-x-2">
            <a
              href="#"
              className="text-azure hover:underline"
              onClick={(e) => {
                e.preventDefault();
                // Add details action here
              }}
            >
              More Details
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#"
              className="text-azure hover:underline"
              onClick={(e) => {
                e.preventDefault();
                onLocationSelect(location);
              }}
            >
              View on Map
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
