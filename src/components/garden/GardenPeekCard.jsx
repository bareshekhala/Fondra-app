import { Link } from "react-router-dom";

import GardenPlot from "@/components/garden/GardenPlot.jsx";



function GardenPeekCard({ flowers = [], unplanted = 0 }) {


  return (
    <section className="glass-card flex h-full flex-col px-5 py-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
          Your garden
        </h2>

        <Link
          to="/garden"
          className="text-sm font-medium text-muted-foreground dark:text-[#9C92C4]"
        >
          Open
        </Link>
      </div>

      <GardenPlot flowers={flowers} />

      <p className="mt-auto pt-3 text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
        {unplanted === 0
          ? "No seeds waiting. Answer a poke and one arrives."
          : `${unplanted} ${unplanted === 1 ? "seed" : "seeds"} waiting to be planted · `}
        {unplanted > 0 && (
          <Link
            to="/garden/unplanted"
            className="font-bold text-[#7C6BD4] underline underline-offset-2 dark:text-[#A38DF0]"
          >
            plant them
          </Link>
        )}
      </p>
    </section>
  );
}

export default GardenPeekCard;
