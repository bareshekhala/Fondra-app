import { Link } from "react-router-dom";
import CircleMember from "@/components/circle/CircleMember.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";

function CircleCard({ circle }) {

  return (
    <section className="glass-card flex h-full flex-col px-5 py-5">

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-[22px] text-[#1E1A2F] dark:text-[#F1ECFA]">
          Your circle
        </h2>

        <Link
          to="/circle"
          className="text-sm font-medium text-muted-foreground dark:text-[#9C94BC]"
        >
          Manage
        </Link>
      </div>


      {circle.length === 0 ? (
        <div className="px-1 py-8 text-center">
          <p className="mx-auto max-w-xs text-sm text-muted-foreground dark:text-[#9C94BC]">
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
        <ScrollArea className="-my-3 max-h-72 pr-3">
          <ul>
          {circle.map((otherUser) => (
            <CircleMember
              key={otherUser._id}
              otherUser={otherUser}
            />
          ))}
          </ul>
        </ScrollArea>
      )}

    </section>
  );
}


export default CircleCard;
