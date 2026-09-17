import { format } from "date-fns";

import { flowerImage } from "@/utils/flowers.js";
import gardenDay from "@/assets/garden-plot-day.jpg";
import gardenNight from "@/assets/garden-plot-night.jpg";

function GardenPlot({ flowers }) {

  const growing = flowers.filter((flower) => flower.picked);

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

      {growing.map((flower) => (
        <div
          key={flower._id}
          className="garden-flower group absolute w-[9%] -translate-x-1/2 -translate-y-full hover:z-10"
          style={{ left: `${flower.x * 100}%`, top: `${flower.y * 100}%` }}
        >
          <img
            src={flowerImage(flower.species)}
            className="w-full"
          />

          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#1E1A2F] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#211B3D]/90 dark:text-foreground">
            {flower.fromUser ? flower.fromUser.name : "Someone"} -{" "}
            {format(new Date(flower.createdAt), "d MMM")}
          </span>
        </div>
      ))}

      {growing.length === 0 && (
        <p className="absolute left-1/2 top-[42%] -translate-x-1/2 text-center font-display text-[22px] italic text-[#1E1A2F] dark:text-foreground">
          {flowers.length === 0
            ? "Nothing planted yet."
            : "Your plot is empty."}

          <span className="mt-1 block font-sans text-[13px] font-medium not-italic text-[#4A4462] dark:text-[#CFC6E6]">
            {flowers.length === 0
              ? "Poke someone and if they poke you back, your first flower can grow here."
              : "None of your flowers are picked. Pick one from your collection."}
          </span>
        </p>
      )}
    </div>
  );
}

export default GardenPlot;
