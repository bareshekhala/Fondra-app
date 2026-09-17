import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import service from "@/services/index.service.js";
import { toast } from "@/components/ui/toast.jsx";

import Avatar from "@/components/shared/Avatar.jsx";
import showError from "@/utils/showError.js";


//when you send a request to someone -> you can withdraw your request
function SentRow({ request, onChanged }) {
  const [busy, setBusy] = useState(false);

  const otherUser = request.recipient;


  const handleWithdraw = async () => {
    setBusy(true);

    try {
      await toast.promise(service.delete(`/connections/${otherUser._id}`), {
        loading: "Withdrawing…",
        success: "Request withdrawn",
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
        <p className="truncate text-sm font-bold text-[#1E1A2F] dark:text-foreground">
          {otherUser.name}
        </p>

        <p className="truncate text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
          @{otherUser.username} · sent{" "}
          {formatDistanceToNowStrict(new Date(request.createdAt))} ago
        </p>
      </div>

      <button
        type="button"
        onClick={handleWithdraw}
        disabled={busy}
        className="shrink-0 rounded-full border border-black/8 px-3.5 py-2 text-xs font-bold text-[#4A4462] transition hover:bg-black/2 disabled:opacity-50 dark:border-white/15 dark:text-[#CFC6E6] dark:hover:bg-white/5"
      >
        Withdraw
      </button>
    </li>
  );
}

export default SentRow;
