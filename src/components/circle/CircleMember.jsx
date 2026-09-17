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

  const POKE_COOLDOWN = 60 * 60 * 1000; //-> 1h in ms -> you can do one poke in one hour
  const DAILY_POKE_LIMIT = 5;

  const [pokesToday, setPokesToday] = useState(otherUser.pokesToday || 0);
  const outOfPokes = pokesToday >= DAILY_POKE_LIMIT;

  const [now, setNow] = useState(Date.now());

  function showSuccess(response) {
  return response.data.message;
}


  const pokeAgainAt = myPokeAt
    ? new Date(myPokeAt).getTime() + POKE_COOLDOWN
    : null;
  const waiting = pokeAgainAt !== null && now < pokeAgainAt;

  const watching = Boolean(checkIn && checkIn.watchOut);

  useEffect(() => {
    if (!waiting && !watching) {
      return;
    }
//this is kind of an internal clock.
// every minute we update "now", so the poke cooldown and the watch-out deadline stay correct without a refresh.
    const tick = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(tick);
  }, [waiting, watching]);



//Not so great part
// when user changes her status to "not so great" a Moth will be shown near her profile so it means she needs care and she wants you to poke :)

  let needsCare = false;
  if (checkIn && checkIn.mood === "Not great") {
    needsCare = true;
  }

//watch out part
// the user went somewhere alone and asked her circle to check on her after some hours -> a green ring while we wait, and it turns into "needs care" once the time has passed
  const watchOutAt = watching && checkIn.watchOutAt ? new Date(checkIn.watchOutAt) : null;
  const overdue = Boolean(watchOutAt) && now > watchOutAt.getTime();

  if (overdue) {
    needsCare = true;
  }

  let ring = false;
  if (needsCare) {
    ring = "care";
  } else if (watching) {
    ring = "watch";
  }

  let status = "no check-ins yet";

  if (checkIn) {
    const ago = formatDistanceToNowStrict(new Date(otherUser.lastCheckIn));
    status = `${checkIn.mood} · ${ago} ago`;
  }

  let watchText = "";
  if (overdue) {
    watchText = `Hasn't checked back in · was due ${format(watchOutAt, "HH:mm")}`;
  } else if (watchOutAt) {
    watchText = `Out alone · check on them after ${format(watchOutAt, "HH:mm")}`;
  } else if (watching) {
    watchText = "Out alone · asked you to keep an eye on them";
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

      <Avatar user={otherUser} size={44} ring={ring} /> 

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#1E1A2F] dark:text-foreground">
          {otherUser.name}
        </p>

        <p
          className={`text-xs font-medium ${
            needsCare ? "text-[#8A6A1F] dark:text-[#F1D48A]" : "text-muted-foreground dark:text-[#9C94BC]"
          }`}
        >
          {status}
        </p>

        {watchText ? (
          <p className={`text-[11px] font-bold ${overdue ? "text-[#8A6A1F] dark:text-[#F1D48A]" : "text-[#3E6B4E] dark:text-[#9CC7AA]"}`}>
            {watchText}
          </p>
        ) : null}

        {checkIn && checkIn.note ? (
          <p className="truncate font-display text-[13px] italic text-[#4A4462] dark:text-[#CFC6E6]">
            "{checkIn.note}"
          </p>
        ) : null}

        {checkIn && checkIn.social ? (
          <p className="truncate text-[11px] font-bold text-[#6A59C4] dark:text-[#C2B3E4]">
            {checkIn.social}
          </p>
        ) : null}

        {pokedAt ? (
          <p className="text-[11px] font-bold text-[#8A6A1F] dark:text-[#F1D48A]">
            poked you · {formatDistanceToNowStrict(new Date(pokedAt))} ago
          </p>
        ) : null}

        {pokesToday > 0 ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C94BC]">
            {pokesToday} of {DAILY_POKE_LIMIT} pokes today
          </p>
        ) : null}

        {outOfPokes ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C94BC]">
            You can poke again tomorrow
          </p>
        ) : waiting ? (
          <p className="text-[11px] font-medium text-muted-foreground dark:text-[#9C94BC]">
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
        className="pill-button shrink-0"
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
                  theirs. The flowers they sent you stay in your collection and
                  you can remove those yourself from there. You can always add
                  each other again.
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
