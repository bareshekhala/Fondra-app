import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
import ParallaxFeature from "@/components/landing/ParallaxFeature.jsx";
import { useTheme } from "@/context/theme-provider.jsx";

import dad from "@/assets/dad.svg";
import img1 from "@/assets/lotus-3.svg";
import sunFlower from "@/assets/sunflower.svg";
import avatar from "@/assets/avatars-row.svg";
import gardenD from "@/assets/garden-day.svg";
import gardenN from "@/assets/garden-night.svg";
import tulip from "@/assets/tulip.svg";
import daisy from "@/assets/daisy.svg";
import fern from "@/assets/fern.svg";
import momRing from "@/assets/avatar-mom-ring.svg";

function HowItWorksPage() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <>
      <Navbar />

      <div
        id="how-it-works"
        className="
          flex flex-col font-display
          text-[#4A4462] dark:text-[#C2B3E4]
          bg-[#F4F1EC] dark:bg-[#14112B]
          w-full min-h-screen px-5 md:px-10 py-10 md:py-12
        "
      >
        <h1 className="text-center text-4xl md:text-5xl mt-5 md:mt-10 text-[#1E1A2F] dark:text-[#F1ECFA]">
          How it Works?
        </h1>

        <div className="relative grid grid-cols-1 md:grid-cols-3 flex-1 gap-6 md:gap-18 mt-4">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-18 hidden h-px
              bg-linear-to-r from-transparent via-[#B7ACD3]/60 to-transparent md:block"
          />

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={img1}
            imageClassName="w-25 md:w-35 shrink-0"
            heading="You tap"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
              Morning or evening, pick how you're doing. Add a line if you want
              to; you never have to.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={avatar}
            imageClassName="w-35 md:w-75 shrink-0"
            heading="They see it"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
              Your circle sees your mood and how long ago you checked in. On a
              hard day, a ring appears around your avatar.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="relative flex flex-row md:flex-col items-center justify-center text-left md:text-center gap-6 md:gap-4"
            image={sunFlower}
            imageClassName="h-25 w-25 md:h-33 md:w-35 shrink-0"
            heading="Quiet gets a nudge"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
              If someone has gone quiet, poke them. When they poke back, you
              get a flower to plant.
            </span>
          </ParallaxFeature>
        </div>
      </div>

      <div className="min-h-screen w-full bg-[#F4F1EC] dark:bg-[#14112B]">
        <h1 className="text-4xl font-display text-center md:text-5xl pt-8 md:pb-10 text-[#1E1A2F] dark:text-[#F1ECFA]">
          Your Garden Remembers Who Cared
        </h1>

        <div
          id="the-garden"
          className="
            flex flex-col md:flex-row w-full
            bg-[#F4F1EC] dark:bg-[#14112B]
            text-[#1E1A2F] dark:text-[#F1ECFA]
            px-10 py-10
          "
        >
          <div className="flex flex-col md:w-1/2 justify-center items-center gap-5 md:gap-10">
            <p
              className="
                font-body text-lg md:text-xl text-center md:text-left
                leading-relaxed max-w-[46ch] md:px-10
              "
            >
              Every poke that gets answered arrives as a seed. Plant it and
              whatever grows keeps the name of the person who sent it, so the
              garden fills up with
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
                  <p className="text-sm md:text-base font-body">
                    12 minutes ago
                  </p>
                </div>
              </div>

              <div
                className="glass-card flex items-center gap-4 p-3"
              >
                <img src={momRing}  className="w-16 md:w-20 shrink-0" />
                <div>
                  <h1 className="text-lg md:text-xl font-bold">Mom</h1>
                  <p className="text-sm md:text-base italic font-display">
                    "Not feeling well"
                  </p>
                </div>
              </div>

              <div
                className="glass-card flex items-center gap-4 p-3"
              >
                <div className="shrink-0 rounded-full border-[2.5px] border-[#6F9A7E] p-0.75">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-[#7C6BD4] text-xl font-bold text-white md:h-18 md:w-18">
                    S
                  </div>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold">Sara</h1>
                  <p className="text-sm md:text-base font-bold text-[#3E6B4E] dark:text-[#9CC7AA]">
                    Out alone · check on them after 23:30
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center leading-relaxed font-body text-base max-w-[36ch]">
              <span className="font-bold text-lg font-display block mb-1">
                What the rings mean
              </span>
              A <span className="font-bold text-[#8A6A1F] dark:text-[#F1D48A]">yellow</span> ring is a hard day: the line under the name swaps from a
              time to their note.
              <br />
              A <span className="font-bold text-[#3E6B4E] dark:text-[#9CC7AA]">green</span> ring means they've gone out alone and
              asked you to check on them after a certain time, if they don't
              check back in, it turns <span className="font-bold text-[#8A6A1F] dark:text-[#F1D48A]">yellow</span>.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center items-center mt-20 md:mt-0">
            <div className="relative inline-block">
              <img
                src={isDark ? gardenN : gardenD}
                className="w-full md:w-170 md:mt-10 h-auto rounded-3xl md:drop-shadow-xl/40"
              />

              <div className="absolute top-15 md:top-1/2 left-20 md:left-48 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="glass-card flex flex-row items-center rounded-full pr-3"
                >
                  <img src={dad}  className="w-6 md:w-7 pl-1" />
                  <h1 className="p-1.5 text-xs font-bold text-[#1E1A2F] md:text-base dark:text-amber-100">
                    From Dad
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-display text-[#4A4462] dark:text-[#C2B3E4] bg-[#F4F1EC] dark:bg-[#14112B] px-5 py-16 md:px-10 md:py-24 ">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-12 text-center">
          <h2 className="text-4xl md:text-5xl text-[#1E1A2F] dark:text-[#F1ECFA]">
            Hard to see?
          </h2>

          <div className="glass-card flex items-end gap-3 px-8 py-6">
            <span className="font-display text-7xl text-[#1E1A2F] dark:text-[#F1ECFA]">Aa</span>
            <span className="font-display text-9xl text-[#7C6BD4] dark:text-[#A38DF0]">Aa</span>
          </div>

          <p className="font-body text-xl leading-relaxed max-w-[42ch]">
            One tap in your profile makes everything in Fondra bigger: the text,
            the buttons, the map, the garden.
            <br />
            It stays that way until you change it back.
          </p>
        </div>
      </div>

      <div
        className="
          min-h-screen font-display
          text-[#4A4462] dark:text-[#C2B3E4]
          bg-[#F4F1EC] dark:bg-[#14112B]
          px-5 py-10 md:px-10 md:py-10
        "
      >
        <h1 className="text-center text-4xl md:text-5xl md:mt-30 text-[#1E1A2F] dark:text-[#F1ECFA]">
          Who ends up using it?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 md:gap-20 md:mt-30">
          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={tulip}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="Families with someone living alone"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
              A grandparent taps one big button each morning. Everyone else
              stops wondering.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={fern}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who live far from home"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
              Your circle sits on a map. One tap from another country lands
              the same as one from next door.
            </span>
          </ParallaxFeature>

          <ParallaxFeature
            className="flex flex-row md:flex-col items-center md:justify-center text-left md:text-center gap-5"
            image={daisy}
            imageClassName="h-25 w-25 md:h-33 md:w-33 shrink-0"
            heading="People who've drifted apart"
          >
            <span className="not-italic font-body text-base leading-relaxed max-w-[34ch] block">
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

export default HowItWorksPage;
