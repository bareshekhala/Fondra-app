import { Link } from "react-router-dom";

import GardenPlot from "@/components/garden/GardenPlot.jsx";



function GardenPeekCard({ flowers = [], unplanted = 0 }) {


  return (
    <section className="glass-card flex h-full flex-col px-5 py-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-[22px] text-[#1E1A2F] dark:text-[#F1ECFA]">
          Your garden
        </h2>

        <Link
          to="/garden"
          className="text-sm font-medium text-muted-foreground dark:text-[#9C94BC]"
        >
          Open
        </Link>
      </div>

      <GardenPlot flowers={flowers} />

      <p className="mt-auto pt-3 text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
        {unplanted === 0
          ? "No seeds waiting. Answer a poke and one arrives."
          : `${unplanted} ${unplanted === 1 ? "seed" : "seeds"} waiting to be planted · `}
        {unplanted > 0 && (
          <Link
            to="/garden/unplanted"
            className="font-bold text-[#6A59C4] underline underline-offset-2 dark:text-[#C2B3E4]"
          >
            plant them
          </Link>
        )}
      </p>
    </section>
  );
}

export default GardenPeekCard;
