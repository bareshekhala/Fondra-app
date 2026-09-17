import { Link } from "react-router-dom";

import lavenderDay from "@/assets/lavender-field-day.svg";
import lavenderNight from "@/assets/lavender-field-night.svg";

function LavenderField() {
  return (
    <div className="flex flex-col items-center">
      <img
        src={lavenderDay}
        className="w-85 max-w-full lg:w-105 dark:hidden"
      />
      <img
        src={lavenderNight}
        className="hidden w-85 max-w-full lg:w-105 dark:block"
      />

      <div className="mt-1 text-center">
        <h2 className="font-display text-2xl text-[#1E1A2F] dark:text-foreground">
          Welcome back!
        </h2>

        <p className="mt-1 text-sm text-[#4A4462] dark:text-[#CFC6E6]">
          Your circle is glad you're here.
        </p>

        <Link to="/dashboard" className="pink-button mt-4 inline-block py-3 text-sm">
          Go to your dashboard
        </Link>
      </div>
    </div>
  );
}

export default LavenderField;
