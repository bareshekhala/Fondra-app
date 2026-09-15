import daisy from "@/assets/daisy.svg";
import tulip from "@/assets/tulip.svg";
import sunflower from "@/assets/sunflower.svg";
import lavender from "@/assets/lavender.svg";
import fern from "@/assets/fern.svg";

const FLOWER_IMAGES = { daisy, tulip, sunflower, lavender, fern };

export function flowerImage(species) {
  return FLOWER_IMAGES[species] || daisy;
}
