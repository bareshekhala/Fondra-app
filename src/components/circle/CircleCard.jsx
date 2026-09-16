import { Link } from "react-router-dom";
import CircleMember from "@/components/circle/CircleMember.jsx";

function CircleCard({ circle }) {

  return (
    <section className="glass-card flex h-full flex-col px-5 py-5">

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
          Your circle
        </h2>

        <Link
          to="/circle"
          className="text-sm font-medium text-muted-foreground dark:text-[#9C92C4]"
        >
          Manage
        </Link>
      </div>


      {circle.length === 0 ? (
        <div className="px-1 py-8 text-center">
          <p className="mx-auto max-w-xs text-sm text-muted-foreground dark:text-[#9C92C4]">
            Nobody here yet. Add the people who'd notice if you went quiet.
          </p>

          <Link
            to="/circle"
            className="pink-button mt-5 inline-block py-3 text-sm"
          >
            Find people
          </Link>
        </div>
      ) : (
        <ul className="-my-3">
          {circle.map((otherUser) => (
            <CircleMember
              key={otherUser._id}
              otherUser={otherUser}
            />
          ))}
        </ul>
      )}

    </section>
  );
}


export default CircleCard;
