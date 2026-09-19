import { useContext, useState } from "react";
import { RefreshCw } from "lucide-react";
import { geoNaturalEarth1 } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import land from "world-atlas/land-110m.json";
import MapPeople from "@/components/circle/MapPeople.jsx";
import { AuthContext } from "@/context/auth.context.jsx";
import { toast } from "@/components/ui/toast.jsx";
import showError from "@/utils/showError.js";

function ConnectionMap({ circle = [], onRefreshLocation }) {
  const { user } = useContext(AuthContext);
  const [locating, setLocating] = useState(false);
  const WIDTH = 800;
  const HEIGHT = 420;
  const SCALE = 158;
  const CENTER = [12, 8];

  // with this user has an option to update her location
  const handleRefreshLocation = async () => {
    setLocating(true);

    try {
      await toast.promise(onRefreshLocation(), {
        loading: "Finding where you are…",
        success: "Location updated",
        error: showError,
      });
    } catch (error) {
      console.log(error);
    }

    setLocating(false);
  };

  const hasLoc = (person) => {
    return (
      person &&
      person.location &&
      typeof person.location.latitude === "number" &&
      typeof person.location.longitude === "number"
    );
  };

  // this is the coordinate of the person -> but we need to convert it to pixels to be able to show it in our map image -> and it will be done with "projection" from  react-simple-maps" later

  const me = hasLoc(user) ? user : null;
  const located = circle.filter(hasLoc);

  //with this we change the zooming of the map according to our circles locations
  const points = me ? [...located, me] : located;
  const projection = geoNaturalEarth1();

  if (points.length > 1) {
    const lons = points.map((person) => person.location.longitude);
    const lats = points.map((person) => person.location.latitude);

    const midLon = (Math.min(...lons) + Math.max(...lons)) / 2;
    const midLat = (Math.min(...lats) + Math.max(...lats)) / 2;

    const halfLon = Math.max((Math.max(...lons) - Math.min(...lons)) / 2, 14);
    const halfLat = Math.max((Math.max(...lats) - Math.min(...lats)) / 2, 8);

    const west = midLon - halfLon;
    const east = midLon + halfLon;
    const south = midLat - halfLat;
    const north = midLat + halfLat;
    const widest = Math.min(Math.max(0, south), north);

    const corners = {
      type: "MultiPoint",
      coordinates: [
        [west, south],
        [east, south],
        [east, north],
        [west, north],
        [west, widest],
        [east, widest],
      ],
    };

    projection.fitExtent([[56, 56], [WIDTH - 56, HEIGHT - 56]], corners);
  } else {
    projection.scale(SCALE).center(CENTER).translate([WIDTH / 2, HEIGHT / 2]);
  }

  return (
    <section className="glass-card flex h-full flex-col overflow-hidden">
      <div className="px-5 pt-5">
        <h2 className="font-display text-[22px] text-[#1E1A2F] dark:text-[#F1ECFA]">
          Your people, on a map
        </h2>

        <p className="mt-0.5 text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
          {located.length} of {circle.length} located
        </p>
      </div>

      <ComposableMap
        projection={projection}
        width={WIDTH}
        height={HEIGHT}
        className="min-h-0 w-full max-w-full flex-1"
        role="img"
      >
        <defs>
          <filter id="map-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              result="noise"
            />

            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0"
              result="alphaNoise"
            />

            <feComposite
              in="alphaNoise"
              in2="SourceGraphic"
              operator="in"
              result="clipped"
            />

            <feBlend in="SourceGraphic" in2="clipped" mode="multiply" />
          </filter>

          <filter id="map-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2.5"
              floodColor="#211B3D"
              floodOpacity="0.22"
            />
          </filter>

          <linearGradient id="map-land" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WIDTH} y2={HEIGHT * 0.4}>
            <stop offset="0%" className="[stop-color:#CDC2F4] dark:[stop-color:#6457B8]" />
            <stop offset="50%" className="[stop-color:#F0C6D8] dark:[stop-color:#8F5F8A]" />
            <stop offset="100%" className="[stop-color:#FFDCC7] dark:[stop-color:#AE7E70]" />
          </linearGradient>

          <linearGradient id="map-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WIDTH} y2="0">
            <stop offset="0%" className="[stop-color:#7C6BD4] dark:[stop-color:#B7A6FF]" />
            <stop offset="50%" className="[stop-color:#D8789F] dark:[stop-color:#F2A7C3]" />
            <stop offset="100%" className="[stop-color:#E5956B] dark:[stop-color:#FFD3B6]" />
          </linearGradient>
        </defs>

        <Geographies geography={land}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="url(#map-land)"
                filter="url(#map-grain)"
                className="stroke-white/60 stroke-[0.4] dark:stroke-white/15"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        <MapPeople me={me} located={located} />
      </ComposableMap>

      <div className="flex items-center justify-between gap-3 px-5 pb-4 text-[11px] font-medium text-muted-foreground dark:text-[#9C94BC]">
        <p>Locations are approximate</p>

        {onRefreshLocation && (
          <button
            type="button"
            onClick={handleRefreshLocation}
            disabled={locating}
            className="flex items-center gap-1.5 font-bold text-[#6A59C4] transition hover:text-[#1E1A2F] disabled:opacity-50 dark:text-[#C2B3E4] dark:hover:text-foreground"
          >
            <RefreshCw size={12} className={locating ? "animate-spin" : ""} />
            {me ? "Moved? Update my location" : "Find my location"}
          </button>
        )}
      </div>
    </section>
  );
}

export default ConnectionMap;
