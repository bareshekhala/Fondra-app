import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { format, formatDistanceToNowStrict } from "date-fns";

import service from "@/services/index.service.js";
import { toast } from "@/components/ui/toast.jsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";

import Avatar from "@/components/shared/Avatar.jsx";
import Moth from "@/components/shared/Moth.jsx";
import PokeMark from "@/components/shared/PokeMark.jsx";
import showError from "@/utils/showError.js";



function CircleMember({ otherUser, onRemoved }) {

  const [removeOpen, setRemoveOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const [pokedAt, setPokedAt] = useState(otherUser.pokedAt);
  const [myPokeAt, setMyPokeAt] = useState(otherUser.myPokeAt);
  const checkIn = otherUser.checkIn;

  const POKE_COOLDOWN = 60 * 60 * 1000; //-> 1h in ms -> you can do one poke in an hour
  const DAILY_POKE_LIMIT = 5;

  const [pokesToday, setPokesToday] = useState(otherUser.pokesToday || 0);
  const outOfPokes = pokesToday >= DAILY_POKE_LIMIT;

  const [now, setNow] = useState(Date.now());

  function showSuccess(response) {
  return response.data.message;
}


//you can do one poke in an hour
  const pokeAgainAt = myPokeAt
    ? new Date(myPokeAt).getTime() + POKE_COOLDOWN
    : null;
  const waiting = pokeAgainAt !== null && now < pokeAgainAt;

  useEffect(() => {
    if (!waiting) {
      return;
    }

    const tick = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(tick);
  }, [waiting]);



//Not so great part
// when user changes her status to "not so great" a Moth will be shown near her profile so it means she needs care and she wants you to poke :)

  let needsCare = false;
  if (checkIn && checkIn.mood === "Not great") {
    needsCare = true;
  }
  let status = "no check-ins yet";

  if (checkIn) {
    const ago = formatDistanceToNowStrict(new Date(otherUser.lastCheckIn));
    status = `${checkIn.mood} · ${ago} ago`;
  }

//post -> poke someone
  const handlePoke = async () => {
    setBusy(true);
    const localDate = format(new Date(), "dd.MM.yyyy");
    const wasPokeBack = Boolean(pokedAt);

    try {
      await toast.promise(service.post(`/pokes/${otherUser._id}`, { localDate }), {
        loading: "Sending poke…",
        success: showSuccess,
        error: showError,
      });
      setPokedAt(null);
      setMyPokeAt(wasPokeBack ? null : new Date().toISOString());
      setPokesToday((count) => count + 1);
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

// delete someone from our circle
  const handleRemove = async () => {
    setRemoveOpen(false);
    setBusy(true);

    try {
      await toast.promise(service.delete(`/connections/${otherUser._id}`), {
        loading: "Removing…",
        success: "Removed from your circle",
        error: showError,
      });

      onRemoved();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  return (
    <li className="flex items-center gap-3 py-3">

      {/* then we see a ring around this avatar */}
      <Avatar user={otherUser} size={44} ring={needsCare} /> 

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#211B3D] dark:text-foreground">
          {otherUser.name}
        </p>

        <p
          className={`text-xs font-medium ${
            needsCare ? "text-[#D9709A]" : "text-muted-foreground dark:text-[#9C92C4]"
          }`}
        >
          {status}
        </p>

        {checkIn && checkIn.note ? (
          <p className="truncate font-serif text-[13px] italic text-[#453D6B] dark:text-[#C6BCE6]">
            "{checkIn.note}"
          </p>
        ) : null}

        {checkIn && checkIn.social ? (
          <p className="truncate text-[11px] font-bold text-[#7C6BD4] dark:text-[#A38DF0]">
            {checkIn.social}
          </p>
        ) : null}

        {pokedAt ? (
          <p className="text-[11px] font-bold text-[#D9709A]">
            poked you · {formatDistanceToNowStrict(new Date(pokedAt))} ago
          </p>
        ) : null}

        {pokesToday > 0 ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C92C4]">
            {pokesToday} of {DAILY_POKE_LIMIT} pokes today
          </p>
        ) : null}

        {outOfPokes ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C92C4]">
            You can poke again tomorrow
          </p>
        ) : waiting ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C92C4]">
            You can poke again in {formatDistanceToNowStrict(pokeAgainAt)}
          </p>
        ) : null}
      </div>

      {needsCare ? <Moth size={24} className="shrink-0" /> : null}

      <button
        type="button"
        onClick={handlePoke}
        disabled={busy || waiting || outOfPokes}
        title={
          outOfPokes
            ? "You can poke again tomorrow"
            : waiting
              ? `You can poke again in ${formatDistanceToNowStrict(pokeAgainAt)}`
              : undefined
        }
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-3.5 py-2 text-xs font-bold text-[#211B3D] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/10 dark:text-foreground"
      >
        <PokeMark size={13} />
        {pokedAt ? "Poke back" : "Poke"}
      </button>

      {onRemoved ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  disabled={busy}
                  className="icon-button"
                >
                  <Ellipsis size={14} />
                </button>
              }
            />

            <DropdownMenuContent align="end" className="dialog-box rounded-2xl p-1.5">
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setRemoveOpen(true)}
                className="rounded-xl px-3 py-2 text-sm font-medium"
              >
                Remove from circle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={removeOpen} onOpenChange={setRemoveOpen}>
            <AlertDialogContent className="dialog-box">
              <AlertDialogHeader>
                <AlertDialogTitle className="dialog-title">
                  Remove {otherUser.name.split(" ")[0]} from your circle?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  They won't see your check-ins anymore, and you won't see
                  theirs. You can always add each other again.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="rounded-b-3xl">
                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>

                <AlertDialogAction
                  variant="destructive"
                  onClick={handleRemove}
                  className="rounded-full"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
    </li>
  );
}

export default CircleMember;
