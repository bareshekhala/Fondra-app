import { formatDistanceToNow } from "date-fns";

import Avatar from "@/components/shared/Avatar.jsx";

function NotificationsCard({ notifications = [], unread = 0 }) {


  const notifMessage = (notification) => {
    if (notification.type === "poke") {
      return "poked you";
    }

    if (notification.type === "poke_back") {
      return "poked you back · a flower is waiting";
    }

    if (notification.type === "checkin") {
      return "checked in";
    }

    if (notification.type === "checkin_update") {
      return "updated their check-in";
    }

    if (notification.type === "request") {
      return "wants to join your circle";
    }

    return "is now in your circle";
  };

  return (
    <section className="glass-card flex h-full flex-col px-5 py-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
          Notifications
        </h2>

        {unread > 0 && (
          <span className="rounded-full bg-[#7C6BD4] px-2 py-0.5 text-[11px] font-bold text-white dark:bg-[#A38DF0] dark:text-[#1D1739]">
            {unread} new
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
          Nothing yet. When your people poke or check in, it shows up here.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {notifications.map((notification, index) => (
            <li key={notification._id} className="flex items-start gap-2.5">
              <Avatar user={notification.actor} size={28} />

              <div className="min-w-0 flex-1">
                <p className="text-xs leading-snug text-[#211B3D] dark:text-foreground">
                  <span className="font-bold">
                    {notification.actor ? notification.actor.name : "Someone"}
                  </span>{" "}
                  {notifMessage(notification)}
                </p>

                <p className="text-[11px] text-muted-foreground dark:text-[#9C92C4]">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>

              {index < unread && (
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#D9709A]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NotificationsCard;
