import React, { useState } from "react";
import LoginCard from "../components/my-components/LoginCard";
import Navbar from "../components/my-components/Navbar";
import Footer from "@/components/my-components/Footer";
//Images
import lanternOff from "../assets/lantern-unlit.svg";
import lanternOn from "../assets/lantern-lit.svg";
import lanternOnNight from "../assets/lantern-lit-night.svg";
import lanternOffNight from "../assets/lantern-unlit-night.svg";
import dad from "../assets/dad.svg";
import mom from "../assets/mom.svg";

import img0 from "../assets/lotus-0.svg";
import img2 from "../assets/lotus-1.svg";
import img1 from "../assets/lotus-3.svg";
import sunFlower from "../assets/sunflower.svg";
import avatar from "../assets/avatars-row.svg";
import gardenD from "../assets/garden-day.svg";
import gardenN from "../assets/garden-night.svg";

import tulip from "../assets/tulip.svg";
import daisy from "../assets/daisy.svg";
import fern from "../assets/fern.svg";

import momRing from "../assets/avatar-mom-ring.svg";

//Dark/light Mode
import { useTheme } from "@/components/my-components/theme-provider";

//scroll effect
import ParallaxFeature from "@/components/my-components/ParallaxFeature";
import { motion } from "framer-motion";

function Dashboard() {
  const [firstImg, setFirstImg] = useState(true);
  const [activeImg, setActiveImg] = useState(img0);
  const { theme } = useTheme();

  // when system is on the dark mode, the garden image should also be changed
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // this function is for showing the different states of check in
  // by each click on the image the state will be changed
  function handleImage() {
    if (activeImg === img0) {
      setActiveImg(img1);
    } else if (activeImg === img1) {
      setActiveImg(img2);
    } else {
      setActiveImg(img0);
    }
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      {/* //Dashboard1 */}
      <div id="login" className="min-h-screen bg-[#F1ECFA] dark:bg-[#777293]">
        <div
          className="
            md:mx-30
            md:rounded-2xl
            bg-white/45
            dark:bg-[#211B3D]
            text-[#211B3D]
            dark:text-[#F1ECFA]
            min-h-screen
            md:mb-20
            md:min-h-0
           md:h-170
          "
        >
          <div
            className="rounded-2xl mx-3 mt-10
            pt-10 md:mt-30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mt-5 flex flex-col gap-16 md:gap-10">
                <div
                  className="
                    text-5xl
                    md:text-6xl
                    mx-10
                    text-center
                    md:text-left
                    font-[Instrumental]
                    text-[#211B3D]
                    dark:text-[#F1ECFA]
                  "
                >
                  Someone
                  <h1>Is Thinking</h1>
                  About You
                </div>

                <div
                  className="
                  italic
                    text-2xl
                    mx-3
                    md:px-5
                    px-10
                    font-[Instrumental]
                    text-center
                    md:text-left
                    text-[#211B3D]
                    dark:text-[#D5C9EE] leading-9"
                >
                  Fondra is one tap that tells the people who worry about you
                  that you're okay.
                  <h1>
                    No feed, no messages to write, nothing to keep up with.
                  </h1>
                </div>

                <div className="mx-auto text-center pb-8 mb-3">
                  <img
                    src={activeImg}
                    onClick={handleImage}
                    className="w-40 h-40 mx-auto cursor-pointer"
                  />

                  {activeImg === img0 && (
                    <h1 className="font-[Instrumental] text-2xl text-[#211B3D] dark:text-[#F1ECFA]">
                      Go on, tap it
                      <p className="italic pt-4">This is the whole app</p>
                    </h1>
                  )}

                  {activeImg === img1 && (
                    <h1 className="font-[Instrumental] text-2xl text-[#211B3D] dark:text-[#F1ECFA]">
                      You Checked In
                    </h1>
                  )}

                  {activeImg === img2 && (
                    <h1 className="font-[Instrumental] text-2xl text-[#211B3D] dark:text-[#F1ECFA]">
                      You Have not Checked In for a While
                    </h1>
                  )}
                </div>
              </div>

              <div className="hidden md:block w-full mt-10 px-6 py-8 pb-20">
                <LoginCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard2 */}

      <div
        id="how-it-works"
        className="
    flex
    flex-col
    font-[Instrumental]
    italic
    text-[#453D6B]
    dark:text-[#C2B3E4]
    bg-white
    dark:bg-[#211B3D]/99
    w-full
    min-h-screen
    px-5
    md:px-10
    py-10
    md:py-12
  "
      >
        <h1
          className="
      text-center
      text-4xl
      md:text-5xl
      mt-5
      md:mt-10
      
    "
        >
          How it Works?
        </h1>

        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-3
      flex-1
      gap-6
      md:gap-18
    "
        >
          <ParallaxFeature
            className="flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-10"
            image={img1}
            imageClassName="w-25 md:w-35 shrink-0"
            heading="You tap"
          >
            Morning or evening. You can add a line about how you're doing, but
            you never have to.
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-10 pt-10"
            image={avatar}
            imageClassName="w-35 md:w-75 shrink-0"
            heading="They see it"
          >
            Your people watch a flower, not a timestamp. Quiet becomes visible.
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-10"
            image={sunFlower}
            imageClassName="h-25 w-25 md:h-33 md:w-35 shrink-0"
            heading="Quiet gets a nudge"
          >
            Anyone can poke you, and you answer just by checking in. Every poke
            becomes a flower.
          </ParallaxFeature>
        </div>
      </div>

      {/* Dashboard3 */}
      <div className="min-h-screen     w-full">
        <h1
          className="
          text-4xl
          font-[Instrumental]
          text-center        
             md:text-5xl
          italic
          mt-8
          md:mb-10
        "
        >
          Your Garden Remembers Who Cared
        </h1>
        <div
          id="the-garden"
          className="
    flex
    flex-col
    md:flex-row
    w-full
    bg-[#F1ECFA]
    dark:bg-[#777293]
    text-[#211B3D]
    dark:text-[#140b3c]
    px-10
    py-10
  "
        >
          <div
            className="
      flex
      flex-col
      md:w-1/2
      justify-center
      items-center
      gap-5
      md:gap-10
    "
          >
            <div className="flex flex-col gap-10">
              <p
                className="
          font-[Instrumental]
          text-xl
          md:text-2xl
          text-center
          md:text-left
          leading-9
          md:px-10
        "
              >
                Every poke arrives as a seed. Plant it and whatever grows keeps
                the name of the person who sent it, so the garden fills up with
                people, not with how disciplined you've been.
                <br />
                There's no streak to break. Miss a week and nothing wilts,
                nothing is taken away.
              </p>
            </div>

            <div
              className="
        flex
        flex-col
        gap-5
        w-full
        md:px-10
      "
            >
              <div
                className="
          flex
          items-center
          gap-4
          rounded-2xl
          bg-white/60
          dark:bg-white/20
          p-3
        "
              >
                <img src={dad} className="w-16 md:w-20 shrink-0" />

                <div>
                  <h1 className="text-lg md:text-xl font-bold">Dad</h1>

                  <p className="text-sm md:text-base">12 minutes ago</p>
                </div>
              </div>

              <div
                className="
          flex
          items-center
          gap-4
          rounded-2xl
          bg-white/60
          dark:bg-white/20
          p-3
        "
              >
                <img src={momRing} alt="" className="w-16 md:w-20 shrink-0" />

                <div>
                  <h1 className="text-lg md:text-xl font-bold">Mom</h1>

                  <p className="text-sm md:text-base italic">
                    "Not feeling well"
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-center leading-9 font-[Instrumental] text-lg">
                <span className=" font-bold text-xl ">
                  How having a hard day looks 👆🏽
                </span>
                <br />
                One ring around the avatar.
                <br />
                The line under the name swaps from a time to their note.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
      md:w-1/2
      flex
      justify-center
      items-center
      mt-20
      md:mt-0
    "
          >
            <div className="relative inline-block">
              <img
                src={isDark ? gardenN : gardenD}
                className="
          w-full
          md:w-170
          md:mt-10
          h-auto
          rounded-2xl
          md:drop-shadow-xl/40
        "
              />

              <div
                className="
          absolute
          top-15
          md:top-1/2
          left-20
          md:left-48
          -translate-x-1/2
          -translate-y-1/2
        "
              >
                <div className="flex flex-row rounded-2xl bg-white/60">
                  <img src={dad} alt="" className="w-6 md:w-7 pl-1" />

                  <h1 className="p-1.5 text-xs font-bold text-blue-950 md:text-base">
                    From Dad
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard-4 */}
      <div
        className="
    min-h-screen
    font-[Instrumental]
    italic
    text-[#453D6B]
    dark:text-[#C2B3E4]
    bg-white
    dark:bg-[#211B3D]
    px-5
    py-10
    md:px-10
    md:py-10
  "
      >
        <h1
          className="
      text-center
      text-4xl
      md:text-5xl
      md:mt-30
    "
        >
          Who ends up using it?
        </h1>

        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-10
mt-8     
md:gap-20
md:mt-30
    "
        >
          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={tulip}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="Families with someone living alone"
          >
            A grandparent taps one big button each morning. Everyone else stops
            wondering.
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={fern}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who go out alone"
          >
            Set a time you expect to be back. If you don't check in, one person
            you chose hears about it.
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={daisy}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who've drifted apart"
          >
            A poke costs nothing to send and nothing to answer. It's a way to
            stay in touch without a conversation.
          </ParallaxFeature>
        </div>
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
