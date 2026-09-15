import { Link } from "react-router-dom";
import { format } from "date-fns";

import { flowerImage } from "@/utils/flowers.js";
import gardenDay from "@/assets/garden-plot-day.svg";
import gardenNight from "@/assets/garden-plot-night.svg";

function GardenPlot({ flowers }) {
  const growing = flowers.filter((flower) => flower.picked);

  const shown = growing.slice(0, PLOT_CAPACITY);
  const hidden = growing.length - shown.length;
  const PLOT_CAPACITY = 15;

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(33,27,61,0.1)]">
      <img
        src={gardenDay}
        className="absolute inset-0 h-full w-full dark:hidden"
      />
      <img
        src={gardenNight}
        className="absolute inset-0 hidden h-full w-full dark:block"
      />

      {shown.map((flower) => (
        <div
          key={flower._id}
          className="garden-flower group absolute w-[9%] -translate-x-1/2 -translate-y-full hover:z-10"
          style={{ left: `${flower.x * 100}%`, top: `${flower.y * 100}%` }}
        >
          <img
            src={flowerImage(flower.species)}
            className="w-full"
          />

          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#211B3D] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#211B3D]/90 dark:text-foreground">
            From {flower.fromUser ? flower.fromUser.name : "someone"} ·{" "}
            {format(new Date(flower.createdAt), "d MMM")}
          </span>
        </div>
      ))}

      {growing.length === 0 && (
        <p className="absolute left-1/2 top-[42%] -translate-x-1/2 text-center font-serif text-[22px] italic text-[#211B3D] dark:text-foreground">
          {flowers.length === 0
            ? "Nothing planted yet."
            : "Your plot is empty."}

          <span className="mt-1 block font-sans text-[13px] font-medium not-italic text-[#453D6B] dark:text-[#C6BCE6]">
            {flowers.length === 0
              ? "Answer a poke and your first flower grows here."
              : "None of your flowers are picked. Pick one from your collection."}
          </span>
        </p>
      )}

      {hidden > 0 && (
        <Link
          to="/garden/collection"
          className="absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold text-[#211B3D] dark:bg-[#211B3D]/85 dark:text-foreground"
        >
          +{hidden} picked, but the plot is full
        </Link>
      )}
    </div>
  );
}

export default GardenPlot;
