function SocialPicker({ value, onChange }) {


const SocialLevels = [
  "Need space",
  "Social battery is low",
  "Just open to be poked",
  "Chat only",
  "Chat & call",
  "Let's hang out",
  "Let's party",
];

  return (
    <div className="flex flex-wrap gap-2">

      {SocialLevels.map((level) => {
        const selected = value === level;

        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(selected ? "" : level)}
            className={`
              rounded-full
              border
              px-3
              py-1.5
              text-xs
              font-bold
              transition
              ${
                selected
                  ? "border-[#7C6BD4] bg-[#7C6BD4]/10 text-[#1E1A2F] dark:border-[#A38DF0] dark:bg-white/10 dark:text-foreground"
                  : "border-black/8 text-[#4A4462] hover:bg-black/2 dark:border-white/12 dark:text-[#CFC6E6] dark:hover:bg-white/5"
              }
            `}
          >
            {level}
          </button>
        );
      })}

    </div>
  );
}


export default SocialPicker;
