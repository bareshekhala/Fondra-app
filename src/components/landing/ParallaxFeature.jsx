//from motion

import { motion } from "framer-motion";

const ENTRANCE_X = {
  left: -120,
  right: 120,
  none: 0,
};

function ParallaxFeature({
  image,
  imageClassName,
  heading,
  children,
  className,
  imageFrom = "none",
  imageContent,
}) {
  return (
    <div className={className}>

      {/* Image */}
      <motion.div
        initial={{
          opacity: 0,
          x: ENTRANCE_X[imageFrom],
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="shrink-0"
      >
        {imageContent ? (
          imageContent
        ) : (
          <img
            src={image}
            alt=""
            className={imageClassName}
          />
        )}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.15,
        }}
      >
        <h1 className="text-2xl md:text-3xl">
          {heading}
        </h1>

        <p className="text-lg md:text-xl mt-3">
          {children}
        </p>
      </motion.div>

    </div>
  );
}

export default ParallaxFeature;