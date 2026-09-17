import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/auth.context.jsx";
import ThemeToggle from "@/components/layout/ThemeToggle.jsx";
//Images
import lavenderDay from "@/assets/lavender-field-day.jpg";
import lavenderNight from "@/assets/lavender-field-night.jpg";

import { useTheme } from "@/context/theme-provider.jsx";

function Dashboard() {
  const { theme } = useTheme();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F4F1EC] text-[#1E1A2F] dark:bg-[#14112B] dark:text-[#F1ECFA]">
        <div className="pointer-events-none absolute -bottom-[120px] -left-[80px] h-[420px] w-[420px] rounded-full bg-[#A99BD1] opacity-60 blur-[70px] dark:bg-[#7E70B5] dark:opacity-[0.18]" />

        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 md:top-6 md:right-8 [&_button]:border-transparent [&_button]:bg-[#F4F1EC] dark:[&_button]:bg-[#14112B]">
          <ThemeToggle />

          {isLoggedIn && (
            <button
              type="button"
              onClick={logout}
              className="font-body text-xs font-medium text-[#6F6A86] transition-colors hover:text-[#6A59C4] dark:text-[#9C94BC] dark:hover:text-[#C2B3E4]"
            >
              Sign out
            </button>
          )}
        </div>

        <div className="relative mx-auto flex min-h-dvh max-w-360 flex-col items-center justify-center gap-10 px-5 pt-3 pb-5 lg:grid lg:grid-cols-[240px_780px_1fr] lg:items-start lg:gap-0 lg:px-10 lg:py-0 lg:content-center">

          <div className="relative z-10 w-fit lg:mt-2 lg:ml-36">
            <h1 className="font-wordmark whitespace-nowrap text-[clamp(64px,19vw,190px)] leading-none tracking-[-0.01em] text-[#6A59C4] dark:text-[#B7ACD3]">
              F
              <span className="mx-[0.03em] inline-block h-[0.47em] w-[0.47em] rounded-full bg-[#F1D48A] align-baseline" />
              ndra
            </h1>

            <p className="font-body mt-3 text-xs tracking-[0.2em] text-[#6F6A86] lg:mt-6 dark:text-[#9C94BC]">
              [noun]
            </p>

            <p className="font-display mt-2 w-full text-base italic leading-snug text-[#4A4462] lg:max-w-140 lg:text-xl dark:text-[#CFC6E6]">
              the warmth of being remembered, the comfort of being seen, the
              feeling of never being too far away.
            </p>
          </div>

          <img
            src={isDark ? lavenderNight : lavenderDay}
            className="mx-auto max-h-[30dvh] w-auto max-w-full object-contain shadow-[0_30px_60px_rgba(30,26,47,0.16)] lg:h-160 lg:max-h-none lg:w-full lg:max-w-195 lg:object-cover dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />

          <div className="ml-5 lg:ml-0 lg:self-center lg:pl-10">
            <div>
              <h2 className="font-display text-3xl leading-[1.05] lg:text-[40px]">
                One tap says
                <br />
                you're okay.
              </h2>

              <p className="font-body mt-3 max-w-[32ch] text-[15px] leading-relaxed text-[#4A4462] lg:mt-5 dark:text-[#CFC6E6]">
                Fondra tells the people who worry about you that you're fine. No
                feed, no messages to write, nothing to keep up with.
              </p>

              <div className="mt-5 flex items-center gap-5 lg:mt-8">
                {isLoggedIn ? (
                  <Link to="/dashboard" className="violet-button">
                    Go to your dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="violet-button">
                    Get started
                  </Link>
                )}

                <Link to="/howitworks" className="violet-link">
                  How it works
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}

export default Dashboard;
