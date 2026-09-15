import moth from "@/assets/moth.svg";

//shown next to people who asked to be checked on
function Moth({ size = 24, className = "" }) {
  return (
    <img
      src={moth}
      alt="Asked to be checked on"
      width={size}
      className={className}
    />
  );
}

export default Moth;
