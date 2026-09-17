import SignUpCard from "@/components/auth/SignUpCard.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import { useTheme } from "@/context/theme-provider.jsx";

import lavenderDay from "@/assets/lavender-field-day.jpg";
import lavenderNight from "@/assets/lavender-field-night.jpg";

function SignUpPage() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#1E1A2F] dark:bg-[#14112B] dark:text-[#F1ECFA]">
      <Navbar />

      <div className="flex min-h-screen">
        <div className="relative hidden w-[38%] max-w-[560px] shrink-0 md:block">
          <img
            src={isDark ? lavenderNight : lavenderDay}
            className="absolute inset-0 h-full w-full object-cover object-[62%_50%]"
          />

          <p className="font-display absolute bottom-10 left-8 text-2xl italic leading-snug text-white drop-shadow-[0_1px_8px_rgba(30,26,47,0.4)]">
            the warmth of
            <br />
            being remembered.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pt-24 pb-10 md:px-12">
          <div className="w-full max-w-md">
            <SignUpCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
