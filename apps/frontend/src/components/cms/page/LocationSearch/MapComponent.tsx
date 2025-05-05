"use client";

import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import type { Location } from "./locations";
import { locations } from "./locations";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Center of the US as default
const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

interface MapComponentProps {
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

export function MapComponent({
  selectedLocation,
  onLocationSelect,
}: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  // Pan to selected location when it changes
  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      map.setZoom(15);
    }
  }, [selectedLocation, map]);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location) => {
      bounds.extend({ lat: location.latitude, lng: location.longitude });
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={4} onLoad={onLoad}>
      {locations.map((location, index) => (
        <MarkerF
          key={index}
          position={{ lat: location.latitude, lng: location.longitude }}
          title={location.name}
          onClick={() => onLocationSelect(location)}
          icon={{
            url: "/icons/bank-marker.svg",
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40),
          }}
          animation={
            selectedLocation === location
              ? google.maps.Animation.BOUNCE
              : undefined
          }
        />
      ))}
    </GoogleMap>
  );
}
