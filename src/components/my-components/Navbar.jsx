import React from "react";
import logo from "../../assets/mark-quiet.svg";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <>
      <nav
        className="
          hidden
          md:flex
          fixed
          top-0
          z-2
          w-full
          flex-row-reverse
          items-center
          p-2
          shrink-0
          font-[Instrumental]

          bg-white/60
          dark:bg-[#211B3D]/40

          text-indigo-950
          dark:text-[#F1ECFA]

          backdrop-blur-lg
        "
      >
        <div className="flex flex-row items-center gap-5 mr-4 text-xl">
          <button
            className="
              p-2
              text-indigo-950
              dark:text-[#D5C9EE]
              hover:text-[#7C6BD4]
              dark:hover:text-[#F2C3D5]
            "
          >
            Login/Sign up
          </button>

          <ModeToggle />
        </div>

        <div className="flex flex-row items-center mr-auto">
          <div
            className="
              font-[Instrumental]
              text-2xl
              italic
              p-2
              text-indigo-950
              dark:text-[#F1ECFA]
            "
          >
            Fondra
          </div>

          <img
            src={logo}
            alt="NotAlone logo"
            className="
              mr-auto
              w-15
              h-15
              ml-4
              animate-spin
              [animation-duration:4s]
            "
          />
        </div>
      </nav>
      <nav
        className="
          md:hidden
          flex
          fixed
          top-0
          z-2
          w-full
          flex-row-reverse
          items-center
          p-2
          shrink-0
          font-[Instrumental]

          bg-white/60
          dark:bg-[#211B3D]/80

          text-indigo-950
          dark:text-[#F1ECFA]

          backdrop-blur-lg
        "
      >
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <div
              className="
              font-[Instrumental]
              text-2xl
              italic
              p-2
              text-indigo-950
              dark:text-[#F1ECFA]
            "
            >
              Fondra
            </div>

            <img
              src={logo}
              className="
              mr-auto
              w-15
              h-15
              animate-spin
              [animation-duration:4s]
            "
            />
          </div>
          <div className="ml-auto p-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
