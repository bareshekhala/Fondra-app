import { useState } from "react";

import service from "@/services/index.service.js";
import { toast } from "@/components/ui/toast.jsx";

import Avatar from "@/components/shared/Avatar.jsx";
import showError from "@/utils/showError.js";

//when someone send you a request to add you to her circle -> you can accept or decline
function RequestRow({ request, onChanged }) {
  const [busy, setBusy] = useState(false);

  const otherUser = request.requester;


  const handleAccept = async () => {
    setBusy(true);

    try {
      await toast.promise(service.put(`/connections/${request._id}/accept`), {
        loading: "Adding…",
        success: "Added to your circle",
        error: showError,
      });

      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  const handleDecline = async () => {
    setBusy(true);

    try {
      await toast.promise(service.delete(`/connections/${otherUser._id}`), {
        loading: "Declining…",
        success: "Request declined",
        error: showError,
      });

      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  return (
    <li className="flex items-center gap-3 py-3">
      <Avatar user={otherUser} size={44} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#211B3D] dark:text-foreground">
          {otherUser.name}
        </p>

        <p className="truncate text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
          @{otherUser.username} · wants to be in your circle
        </p>
      </div>

      <button
        type="button"
        onClick={handleDecline}
        disabled={busy}
        className="shrink-0 rounded-full border border-black/8 px-3.5 py-2 text-xs font-bold text-[#453D6B] transition hover:bg-black/2 disabled:opacity-50 dark:border-white/15 dark:text-[#C6BCE6] dark:hover:bg-white/5"
      >
        Decline
      </button>

      <button
        type="button"
        onClick={handleAccept}
        disabled={busy}
        className="pink-button shrink-0 py-2 text-xs disabled:opacity-50"
      >
        Accept
      </button>
    </li>
  );
}

export default RequestRow;
