import { formatDistanceToNow } from "date-fns";

import Avatar from "@/components/shared/Avatar.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";

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
    <section className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#F1D48A] px-5 py-5 text-[#1E1A2F]">
      <div className="pointer-events-none absolute -right-8 -bottom-10 size-40 rounded-full bg-white/35" />

      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-[22px]">
          Notifications
        </h2>

        {unread > 0 && (
          <span className="rounded-full bg-[#1E1A2F] px-2 py-0.5 text-[11px] font-bold text-[#F1D48A]">
            {unread} new
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-xs font-medium text-[#6B5320]">
          Nothing yet. When your people poke or check in, it shows up here.
        </p>
      ) : (
        <ScrollArea className="relative max-h-64 pr-3">
          <ul className="flex flex-col gap-3">
          {notifications.map((notification, index) => (
            <li key={notification._id} className="flex items-start gap-2.5">
              <Avatar user={notification.actor} size={28} />

              <div className="min-w-0 flex-1">
                <p className="text-xs leading-snug">
                  <span className="font-bold">
                    {notification.actor ? notification.actor.name : "Someone"}
                  </span>{" "}
                  {notifMessage(notification)}
                </p>

                <p className="text-[11px] text-[#6B5320]">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>

              {index < unread && (
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#1E1A2F]" />
              )}
            </li>
          ))}
          </ul>
        </ScrollArea>
      )}
    </section>
  );
}

export default NotificationsCard;
