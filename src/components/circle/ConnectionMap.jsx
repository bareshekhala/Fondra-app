import { useContext, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

import land from "world-atlas/land-110m.json";
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
  const LINE = "#7C6BD4";

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
  const toCoords = (person) => {
    return [person.location.longitude, person.location.latitude];
  };

  //when no avator -> we show the initials
  const initialOf = (person) => {
    const name = person.name || person.username || "?";
    return name.trim()[0].toUpperCase();
  };

  const me = hasLoc(user) ? user : null;
  const located = circle.filter(hasLoc);

  return (
    <section className="glass-card flex h-full flex-col overflow-hidden">
      <div className="px-5 pt-5">
        <h2 className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
          Your people, on a map
        </h2>

        <p className="mt-0.5 text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
          {located.length} of {circle.length} located
        </p>
      </div>

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: SCALE, center: CENTER }}
        width={WIDTH}
        height={HEIGHT}
        className="min-h-0 w-full flex-1"
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
        </defs>

        <Geographies geography={land}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E2DBF1"
                stroke="none"
                filter="url(#map-grain)"
                className="fill-border dark:fill-[#4F4784] dark:stroke-[#6A60A3] dark:stroke-[0.4]"
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* the lines from me to everyone */}
        {me &&
          located.map((otherUser) => (
            <Line
              key={`line-${otherUser._id}`}
              from={toCoords(me)}
              to={toCoords(otherUser)}
              stroke={LINE}
              strokeWidth={1.4}
              strokeOpacity={0.7}
              strokeLinecap="round"
            />
          ))}

        {located.map((otherUser) => (
          <Marker key={otherUser._id} coordinates={toCoords(otherUser)}>
            <circle r={14} fill="#fff" filter="url(#map-shadow)" />

            {otherUser.avatar ? (
              <>
                <clipPath id={`clip-${otherUser._id}`}>
                  <circle r={12} />
                </clipPath>

                <image
                  href={otherUser.avatar}
                  x={-12}
                  y={-12}
                  width={24}
                  height={24}
                  clipPath={`url(#clip-${otherUser._id})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              </>
            ) : (
              <>
                <circle r={12} fill={LINE} />

                <text
                  textAnchor="middle"
                  y={4}
                  fontSize={12}
                  fontWeight={700}
                  fill="#fff"
                >
                  {initialOf(otherUser)}
                </text>
              </>
            )}

            <text
              x={18}
              y={-1}
              fontSize={12}
              fontWeight={700}
              className="map-label fill-[#211B3D] dark:fill-background"
            >
              {otherUser.name}
            </text>

            <text
              x={18}
              y={12}
              fontSize={10}
              fontWeight={500}
              className="map-label fill-muted-foreground dark:fill-[#9C92C4]"
            >
              {otherUser.location.city && otherUser.location.country
                ? `${otherUser.location.city}, ${otherUser.location.country}`
                : otherUser.location.city || otherUser.location.country}
            </text>
          </Marker>
        ))}

        {me && (
          <Marker coordinates={toCoords(me)}>
            <circle
              r={20}
              fill="none"
              stroke={LINE}
              strokeWidth={1}
              strokeOpacity={0.6}
            />

            <circle r={16} fill="#fff" filter="url(#map-shadow)" />

            {me.avatar ? (
              <>
                <clipPath id="clip-me">
                  <circle r={14} />
                </clipPath>

                <image
                  href={me.avatar}
                  x={-14}
                  y={-14}
                  width={28}
                  height={28}
                  clipPath="url(#clip-me)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </>
            ) : (
              <>
                <circle r={14} fill={LINE} />

                <text
                  textAnchor="middle"
                  y={5}
                  fontSize={14}
                  fontWeight={700}
                  fill="#fff"
                >
                  {initialOf(me)}
                </text>
              </>
            )}

            <text
              textAnchor="middle"
              y={31}
              fontSize={12}
              fontWeight={700}
              className="map-label fill-[#211B3D] dark:fill-background"
            >
              You
            </text>
          </Marker>
        )}
      </ComposableMap>

      <div className="flex items-center justify-between gap-3 px-5 pb-4 text-[11px] font-medium text-muted-foreground dark:text-[#9C92C4]">
        <p>Locations are approximate</p>

        {onRefreshLocation && (
          <button
            type="button"
            onClick={handleRefreshLocation}
            disabled={locating}
            className="flex items-center gap-1.5 font-bold text-[#7C6BD4] transition hover:text-[#211B3D] disabled:opacity-50 dark:text-[#A38DF0] dark:hover:text-foreground"
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
