import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "@/components/layout/Navbar.jsx";
import { AuthContext } from "@/context/auth.context.jsx";
import { useTheme } from "@/context/theme-provider.jsx";

import lavenderDay from "@/assets/lavender-field-day.jpg";
import lavenderNight from "@/assets/lavender-field-night.jpg";
import lotus from "@/assets/lotus-1.svg";

function NotFoundPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
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
            still close,
            <br />
            somehow.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pt-24 pb-10 md:px-12">
          <div className="glass-card w-full max-w-md px-6 py-10 text-center">
            <img src={lotus} alt="" className="mx-auto h-20" />

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground dark:text-[#9C94BC]">
              404
            </p>

            <h1 className="font-display mt-2 text-3xl text-[#1E1A2F] dark:text-foreground">
              This page drifted off
            </h1>

            <p className="font-body mt-3 text-sm text-muted-foreground dark:text-[#9C94BC]">
              There is nothing at this address. The link may be old, or the
              page may have moved.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                to={isLoggedIn ? "/dashboard" : "/"}
                className="pink-button block py-3 text-[15px]"
              >
                {isLoggedIn ? "Back to your dashboard" : "Back to the start"}
              </Link>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-sm font-medium text-muted-foreground underline underline-offset-2 dark:text-[#9C94BC]"
              >
                Go back to where I was
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
