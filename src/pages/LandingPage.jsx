import { useState, useContext } from "react";
import { AuthContext } from "@/context/auth.context.jsx";
import LoginCard from "@/components/auth/LoginCard.jsx";
import LavenderField from "@/components/landing/LavenderField.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
//Images
import lanternOff from "@/assets/lantern-unlit.svg";
import lanternOn from "@/assets/lantern-lit.svg";
import lanternOnNight from "@/assets/lantern-lit-night.svg";
import lanternOffNight from "@/assets/lantern-unlit-night.svg";
import dad from "@/assets/dad.svg";
import mom from "@/assets/mom.svg";

import img0 from "@/assets/lotus-0.svg";
import img2 from "@/assets/lotus-1.svg";
import img1 from "@/assets/lotus-3.svg";
import sunFlower from "@/assets/sunflower.svg";
import avatar from "@/assets/avatars-row.svg";
import gardenD from "@/assets/garden-day.svg";
import gardenN from "@/assets/garden-night.svg";

import tulip from "@/assets/tulip.svg";
import daisy from "@/assets/daisy.svg";
import fern from "@/assets/fern.svg";

import momRing from "@/assets/avatar-mom-ring.svg";

import { useTheme } from "@/context/theme-provider.jsx";
import ParallaxFeature from "@/components/landing/ParallaxFeature.jsx";
import { motion } from "framer-motion";

function Dashboard() {
  const [activeImg, setActiveImg] = useState(img0);
  const { theme } = useTheme();
  const { isLoggedIn } = useContext(AuthContext);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  function handleImage() {
    if (activeImg === img0) setActiveImg(img1);
    else if (activeImg === img1) setActiveImg(img2);
    else setActiveImg(img0);
  }

  const status = {
    [img0]: { title: "Go on, tap it", sub: "This is the whole app." },
    [img1]: { title: "Still here.", sub: "Your circle can see it open." },
    [img2]: {
      title: "It's been a while",
      sub: "A gentle nudge might be nice.",
    },
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      {/* Dashboard1 */}
      <div id="login" className="min-h-screen bg-background dark:bg-[#1D1739]">
        <div
          className={`
            md:mx-30 glass-card rounded-none md:rounded-3xl
            text-[#211B3D] dark:text-foreground
            md:mb-20 md:mt-30 lg:mt-30
            ${
              isLoggedIn
                ? "min-h-0 md:py-10 lg:py-14"
                : "min-h-screen md:min-h-0 md:h-170 lg:min-h-0 lg:h-200"
            }
          `}
        >
          <div className="rounded-3xl mx-3 mt-10 pt-5 md:mt-5">
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isLoggedIn ? "md:items-center" : ""}`}>
              <div
                className={`mt-5 flex flex-col px-5 md:px-0 ${
                  isLoggedIn ? "gap-10 md:gap-8" : "gap-28 md:gap-5 lg:gap-15"
                }`}
              >
                <div
                  className="
                    text-5xl md:text-6xl mx-10 text-center md:text-left
                    font-serif italic
                    text-[#211B3D] dark:text-foreground
                  "
                >
                  Someone
                  <h1>Is Thinking</h1>
                  About You
                </div>

                <p
                  className="
                    text-lg md:text-xl md:mx-10 md:ml-10
                    text-center md:text-left leading-relaxed
                    max-w-[42ch] mx-auto 
                    text-[#453D6B] dark:text-[#D5C9EE]
                  "
                >
                  Fondra is one tap that tells the people who worry about you
                  that you're okay. No feed, no messages to write, nothing to
                  keep up with.
                </p>

        
                {isLoggedIn && (
                  <div className="md:hidden pb-8">
                    <LavenderField />
                  </div>
                )}

                {!isLoggedIn && (
                <div className="mx-auto text-center pb-8 mb-3">
                  <div className="relative mx-auto flex h-48 w-48 items-center justify-center md:h-52 md:w-52">
                    <div
                      className="absolute inset-0 rounded-full transition-opacity dark:opacity-0"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(251,220,234,0.5) 45%, rgba(222,123,158,0.12) 70%, transparent 100%)",
                      }}
                    />

                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity dark:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(255,240,247,0.85) 0%, rgba(242,162,196,0.32) 45%, rgba(163,141,240,0.14) 70%, transparent 100%)",
                      }}
                    />
                    <motion.img
                      src={activeImg}
                      onClick={handleImage}
                      whileTap={{ scale: 1.08 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="relative h-40 w-40 cursor-pointer"
                    />
                  </div>

                  <h1 className="mt-5 font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
                    {status[activeImg].title}
                  </h1>
                  <p className="mt-1 text-base text-[#453D6B] dark:text-[#D5C9EE]">
                    {status[activeImg].sub}
                  </p>
                </div>
                )}
              </div>

              <div className={`hidden md:block w-full px-6 ${isLoggedIn ? "py-4" : "mt-10 py-8 pb-20"}`}>
                {isLoggedIn ? <LavenderField /> : <LoginCard />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard2*/}
      <div
        id="how-it-works"
        className="
          flex flex-col font-serif
          text-[#453D6B] dark:text-[#C2B3E4]
          bg-white dark:bg-[#211B3D]/99
          w-full min-h-screen px-5 md:px-10 py-10 md:py-12
        "
      >
        <h1 className="text-center text-4xl md:text-5xl mt-5 md:mt-10 italic text-[#211B3D] dark:text-foreground">
          How it Works?
        </h1>

        <div className="relative grid grid-cols-1 md:grid-cols-3 flex-1 gap-6 md:gap-18 mt-4">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-18 hidden h-px
              bg-linear-to-r from-transparent via-[#9990BE]/50 to-transparent md:block"
          />

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={img1}
            imageClassName="w-25 md:w-35 shrink-0"
            heading="You tap"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              Morning or evening. You can add a line about how you're doing, but
              you never have to.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={avatar}
            imageClassName="w-35 md:w-75 shrink-0"
            heading="They see it"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              Your people watch a flower, not a timestamp. Quiet becomes
              visible.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={sunFlower}
            imageClassName="h-25 w-25 md:h-33 md:w-35 shrink-0"
            heading="Quiet gets a nudge"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              Anyone can poke you, and you answer just by checking in. Every
              poke becomes a flower.
            </span>
          </ParallaxFeature>
        </div>
      </div>

      {/* Dashboard3 */}
      <div className="min-h-screen w-full bg-background dark:bg-[#777293]">
        <h1 className="text-4xl font-serif italic text-center md:text-5xl pt-8 md:pb-10 text-[#211B3D] dark:text-[#211B3D]">
          Your Garden Remembers Who Cared
        </h1>

        <div
          id="the-garden"
          className="
            flex flex-col md:flex-row w-full
            bg-background dark:bg-[#777293]
            text-[#211B3D] dark:text-[#140b3c]
            px-10 py-10
          "
        >
          <div className="flex flex-col md:w-1/2 justify-center items-center gap-5 md:gap-10">
            <p
              className="
                font-sans text-lg md:text-xl text-center md:text-left
                leading-relaxed max-w-[46ch] md:px-10
              "
            >
              Every poke arrives as a seed. Plant it and whatever grows keeps
              the name of the person who sent it, so the garden fills up with
              people, not with how disciplined you've been.
              <br />
              <br />
              There's no streak to break. Miss a week and nothing wilts, nothing
              is taken away.
            </p>

            <div className="flex flex-col gap-5 w-full md:px-10">
              <div
                className="glass-card flex items-center gap-4 p-3"
              >
                <img src={dad} className="w-16 md:w-20 shrink-0" />
                <div>
                  <h1 className="text-lg md:text-xl font-bold">Dad</h1>
                  <p className="text-sm md:text-base font-sans">
                    12 minutes ago
                  </p>
                </div>
              </div>

              <div
                className="glass-card flex items-center gap-4 p-3"
              >
                <img src={momRing} alt="" className="w-16 md:w-20 shrink-0" />
                <div>
                  <h1 className="text-lg md:text-xl font-bold">Mom</h1>
                  <p className="text-sm md:text-base italic font-serif">
                    "Not feeling well"
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center leading-relaxed font-sans text-base max-w-[36ch]">
              <span className="font-bold text-lg font-serif italic block mb-1">
                How having a hard day looks
              </span>
              One ring around the avatar. The line under the name swaps from a
              time to their note.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 flex justify-center items-center mt-20 md:mt-0"
          >
            <div className="relative inline-block">
     
              <motion.img
                src={isDark ? gardenN : gardenD}
                animate={{ rotate: [-0.6, 0.6, -0.6] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full md:w-170 md:mt-10 h-auto rounded-3xl md:drop-shadow-xl/40"
              />

              <div className="absolute top-15 md:top-1/2 left-20 md:left-48 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="glass-card flex flex-row items-center rounded-full pr-3"
                >
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
          min-h-screen font-serif
          text-[#453D6B] dark:text-[#C2B3E4]
          bg-white dark:bg-[#211B3D]
          px-5 py-10 md:px-10 md:py-10
        "
      >
        <h1 className="text-center text-4xl md:text-5xl md:mt-30 italic text-[#211B3D] dark:text-foreground">
          Who ends up using it?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 md:gap-20 md:mt-30">
          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={tulip}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="Families with someone living alone"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              A grandparent taps one big button each morning. Everyone else
              stops wondering.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={fern}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who go out alone"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              Set a time you expect to be back. If you don't check in, one
              person you chose hears about it.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={daisy}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who've drifted apart"
          >
            <span className="not-italic font-sans text-base leading-relaxed max-w-[34ch] block">
              A poke costs nothing to send and nothing to answer. It's a way to
              stay in touch without a conversation.
            </span>
          </ParallaxFeature>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
