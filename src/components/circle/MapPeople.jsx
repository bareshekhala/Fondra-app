import { Marker, useMapContext } from "react-simple-maps";

function MapPeople({ me, located }) {
const LINE = "#7C6BD4";
const NEAR = 44;


  const { projection } = useMapContext();

  const toCoords = (person) => {
    return [person.location.longitude, person.location.latitude];
  };

  const initialOf = (person) => {
    const name = person.name || person.username || "?";
    return name.trim()[0].toUpperCase();
  };

  const placeOf = (person) => {
    const { city, country } = person.location;

    if (city && country) {
      return `${city}, ${country}`;
    }

    return city || country;
  };

  const people = me ? [...located, me] : located;

  const groups = [];

  people.forEach((person) => {
    const [x, y] = projection(toCoords(person));
    const near = groups.find((group) => {
      const gx = group.x - x;
      const gy = group.y - y;
      return Math.sqrt(gx * gx + gy * gy) < NEAR;
    });

    if (near) {
      near.members.push(person);
    } else {
      groups.push({ x, y, coordinates: toCoords(person), members: [person] });
    }
  });

  const offsetOf = (count, index) => {
    const radius = count === 1 ? 0 : Math.max(30, (count * 46) / (2 * Math.PI));
    const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
    return [Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius)];
  };

  const positionOf = (person) => {
    const group = groups.find((g) => g.members.includes(person));
    const [dx, dy] = offsetOf(group.members.length, group.members.indexOf(person));
    return [group.x + dx, group.y + dy];
  };

  const arcPath = (from, to) => {
    const a = positionOf(from);
    const b = positionOf(to);

    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const lift = Math.min(60, length * 0.22);

    let nx = -dy / length;
    let ny = dx / length;
    if (ny > 0) {
      nx = -nx;
      ny = -ny;
    }

    return `M${a[0]},${a[1]} Q${mx + nx * lift},${my + ny * lift} ${b[0]},${b[1]}`;
  };

  const lines = me
    ? located.map((person) => (
        <path
          key={`line-${person._id}`}
          d={arcPath(me, person)}
          fill="none"
          strokeWidth={2.6}
          strokeOpacity={0.75}
          strokeLinecap="round"
          strokeDasharray="0.1 7"
          className="stroke-[#1E1A2F] dark:stroke-[#F1ECFA]"
        />
      ))
    : null;

  const markers = groups.map((group) => {
    const count = group.members.length;

    return (
      <Marker key={`${group.x},${group.y}`} coordinates={group.coordinates}>
        {group.members.map((person, index) => {
          const [dx, dy] = offsetOf(count, index);
          const isMe = person === me;
          const outer = isMe ? 26 : 22;
          const inner = isMe ? 24 : 20;

          return (
            <g key={isMe ? "me" : person._id} transform={`translate(${dx}, ${dy})`} className="group">
              {isMe && (
                <>
                  <circle r={38} className="fill-[#2FB596]/15 dark:fill-[#9EF0D2]/20" />
                  <circle r={31} fill="none" strokeWidth={1} className="stroke-[#2FB596] dark:stroke-[#9EF0D2]" />
                </>
              )}

              <circle r={outer} fill="#fff" filter="url(#map-shadow)" />

              {person.avatar ? (
                <>
                  <clipPath id={`clip-${isMe ? "me" : person._id}`}>
                    <circle r={inner} />
                  </clipPath>

                  <image
                    href={person.avatar}
                    x={-inner}
                    y={-inner}
                    width={inner * 2}
                    height={inner * 2}
                    clipPath={`url(#clip-${isMe ? "me" : person._id})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </>
              ) : (
                <>
                  <circle r={inner} fill={LINE} className={isMe ? "fill-[#2FB596] dark:fill-[#9EF0D2]" : ""} />

                  <text
                    textAnchor="middle"
                    y={isMe ? 7 : 6}
                    fontSize={isMe ? 22 : 18}
                    fontWeight={700}
                    className={isMe ? "fill-white dark:fill-[#1D1739]" : "fill-white"}
                  >
                    {initialOf(person)}
                  </text>
                </>
              )}

              {isMe && (
                <text
                  textAnchor="middle"
                  y={44}
                  fontSize={12}
                  fontWeight={700}
                  className="map-label fill-[#1F8A72] dark:fill-[#9EF0D2]"
                >
                  You
                </text>
              )}

              {!isMe && (
                <g className="pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">
                  <text
                    textAnchor="middle"
                    y={-(outer + 20)}
                    fontSize={12}
                    fontWeight={700}
                    className="map-label fill-[#1E1A2F] dark:fill-foreground"
                  >
                    {person.name}
                  </text>

                  <text
                    textAnchor="middle"
                    y={-(outer + 7)}
                    fontSize={11}
                    fontWeight={600}
                    className="map-label fill-muted-foreground dark:fill-[#C6BCE6]"
                  >
                    {placeOf(person)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </Marker>
    );
  });

  return (
    <>
      {lines}
      {markers}
    </>
  );
}

export default MapPeople;
