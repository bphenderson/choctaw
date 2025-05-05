"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { locations } from "./locations";
import { LocationsList } from "./LocationsList";
import type { Location } from "./locations";

const MapComponent = dynamic(
  () => import("./MapComponent").then((mod) => mod.MapComponent),
  { ssr: false },
);

export function LocationSearchInteractive() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left column - 1/4 width */}
      <div className="w-full lg:w-1/4 overflow-auto max-h-[calc(100vh-6rem)] sticky top-24">
        <LocationsList
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>

      {/* Right column - 3/4 width */}
      <div className="w-full lg:w-3/4 h-[calc(100vh-6rem)] sticky top-24">
        <MapComponent
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>
    </div>
  );
}
