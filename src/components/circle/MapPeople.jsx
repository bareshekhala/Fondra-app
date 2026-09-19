import { useMapContext } from "react-simple-maps";

function MapPeople({ me, located }) {
  const LINE = "#7C6BD4";
  const GAP = 44;
  const EDGE = 24;

  const { projection, width, height } = useMapContext();

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
  const positions = people.map((person) => projection(toCoords(person)));

  for (let round = 0; round < 40; round++) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[j][0] - positions[i][0];
        const dy = positions[j][1] - positions[i][1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < GAP) {
          const angle = (i + j) * 2.4;
          const ux = dist < 0.5 ? Math.cos(angle) : dx / dist;
          const uy = dist < 0.5 ? Math.sin(angle) : dy / dist;
          const push = (GAP - dist) / 2;

          positions[i][0] -= ux * push;
          positions[i][1] -= uy * push;
          positions[j][0] += ux * push;
          positions[j][1] += uy * push;
        }
      }
    }
  }

  positions.forEach((position) => {
    position[0] = Math.min(Math.max(position[0], EDGE), width - EDGE);
    position[1] = Math.min(Math.max(position[1], EDGE), height - EDGE);
  });

  const positionOf = (person) => {
    return positions[people.indexOf(person)];
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

  const markers = people.map((person, index) => {
    const [x, y] = positions[index];
    const isMe = person === me;
    const outer = 18;
    const inner = 16;

    return (
      <g key={isMe ? "me" : person._id} transform={`translate(${x}, ${y})`} className="group">
        {isMe && (
          <>
            <circle r={27} className="fill-[#2FB596]/15 dark:fill-[#9EF0D2]/20" />
            <circle r={22} fill="none" strokeWidth={1} className="stroke-[#2FB596] dark:stroke-[#9EF0D2]" />
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
              y={5}
              fontSize={15}
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
            y={32}
            fontSize={11}
            fontWeight={700}
            className="map-label fill-[#1F8A72] dark:fill-[#9EF0D2]"
          >
            You
          </text>
        )}

        <g className="pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">
          {!isMe && (
            <text
              textAnchor="middle"
              y={-(outer + 20)}
              fontSize={12}
              fontWeight={700}
              className="map-label fill-[#1E1A2F] dark:fill-foreground"
            >
              {person.name}
            </text>
          )}

          <text
            textAnchor="middle"
            y={-(outer + (isMe ? 14 : 7))}
            fontSize={11}
            fontWeight={600}
            className="map-label fill-muted-foreground dark:fill-[#C6BCE6]"
          >
            {placeOf(person)}
          </text>
        </g>
      </g>
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
