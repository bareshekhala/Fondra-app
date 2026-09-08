import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="">
      <footer
        className="
        flex
        flex-col
    font-[Instrumental]
    bg-[#F1ECFA]
    dark:bg-[#211B3D]/85
    text-[#453D6B]
    dark:text-[#C2B3E4]
    px-6
    md:px-10
    py-10
    md:h-90     
    
  "
      >
        <div
          className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-x-8
      gap-y-10
      items-center
      justify-items-center
      mb-4
    "
        >
          <div className="pl-10">
            <h1
              className="
          text-2xl
          md:text-3xl
          text-[#211B3D]
          dark:text-[#F1ECFA]
        "
            >
              Fondra
            </h1>

            <p className="mt-4 text-sm md:text-base leading-6">
             Just a flower
              and the people who'd notice if it stopped opening.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-base md:text-lg text-[#211B3D] dark:text-[#F1ECFA]">
              The app
            </h2>

            <div className="flex flex-col gap-3 mt-4 text-sm md:text-base">
              <a href="#how-it-works">How it works</a>
              <a href="#the-garden">The garden</a>
              <a href="#">Large text mode</a>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-base md:text-lg text-[#211B3D] dark:text-[#F1ECFA]">
              Your account
            </h2>

            <div className="flex flex-col gap-3 mt-4 text-sm md:text-base">
              <a href="#login">Sign in</a>
              <Link to="/signup">Create an account</Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-base md:text-lg text-[#211B3D] dark:text-[#F1ECFA]">
              About{" "}
            </h2>

            <div className="flex flex-col gap-3 mt-4 text-sm md:text-base">
              <Link to="/getintouch">Get in touch</Link>
              <Link to="/aboutfondra">About Fondra </Link>
            </div>
          </div>
        </div>

        <div
          className="
      border-t
      border-[#C2B3E4]
      dark:border-[#453D6B]
      pt-6
      flex
      flex-col
      md:flex-row
      md:justify-between
      gap-4
      text-xs
      md:text-sm
      mt-auto
    "
        >
          <p>© 2026 Fondra</p>

          <p className="md:text-right">
            Fondra is for everyday care, not emergencies. In a crisis, contact
            your local emergency services.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
