function Avatar({ user, size = 44, ring = false }) {
  if (!user) {
    return null;
  }

  //when a user does not have any picture we use her intitials and put it in the avatar area
  const name = user.name || user.username || "?";
  const words = name.split(" ");

  const initials =
    words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : words[0][0].toUpperCase();

  return (
    <div
      className={`shrink-0 rounded-full ${ring ? "border-[2.5px] border-[#D9709A] p-0.75" : ""}`}
      style={{ width: size, height: size }}
    >
      <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-[#7C6BD4]">
        {user.avatar ?  (
          <img
            src={user.avatar}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="font-bold text-white"
            style={{ fontSize: size * 0.4 }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}

export default Avatar;
