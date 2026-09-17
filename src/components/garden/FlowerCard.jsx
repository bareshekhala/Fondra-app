import { useState } from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

import service from "@/services/index.service.js";
import { toast } from "@/components/ui/toast.jsx";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";

import Avatar from "@/components/shared/Avatar.jsx";

import showError from "@/utils/showError.js";
import { flowerImage } from "@/utils/flowers.js";

function FlowerCard({ flower, variant = "collection", onChanged }) {

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [plantOpen, setPlantOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const isUnplanted = variant === "unplanted";
  const sender = isUnplanted ? flower.from : flower.fromUser;



  const handleDelete = async () => {
    setDeleteOpen(false);
    setBusy(true);

    try {
      await toast.promise(
        service.delete(
          isUnplanted ? `/pokes/${flower._id}` : `/garden/${flower._id}`,
        ),
        {
          loading: "Removing…",
          success: isUnplanted
            ? "Flower thrown away"
            : "Flower removed from your collection",
          error: showError,
        },
      );

      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  const handlePlant = async (picked) => {
    setPlantOpen(false);
    setBusy(true);

    try {
      await toast.promise(
        service.post(`/garden/plant/${flower._id}`, { picked }),
        {
          loading: "Planting…",
          success: picked
            ? "Planted in your garden"
            : "Kept in your collection",
          error: showError,
        },
      );

      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  const handlePick = async () => {
    setBusy(true);

    try {
      await toast.promise(
        service.put(`/garden/${flower._id}/picked`, { picked: !flower.picked }),
        {
          loading: flower.picked ? "Taking it out…" : "Picking…",
          success: flower.picked
            ? "Back in your collection"
            : "Picked for your garden",
          error: showError,
        },
      );

      onChanged();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  return (
    <div className="glass-card flex flex-col items-center px-5 py-6 text-center">

      <img
        src={flowerImage(flower.species)}
        className="h-28"
      />

      <p className="mt-3 font-display text-xl capitalize text-[#1E1A2F] dark:text-foreground">
        {flower.species || "flower"}
      </p>


      <div className="mt-3 flex items-center gap-2">
        <Avatar user={sender} size={28} />

        <p className="text-sm font-bold text-[#1E1A2F] dark:text-foreground">
          {sender ? sender.name : "Someone"}
        </p>
      </div>

      <p className="mt-1 text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
        {format(new Date(flower.createdAt), "d MMMM yyyy · HH:mm")}
      </p>


      {!isUnplanted && flower.picked && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <p className="text-xs font-bold text-[#6A59C4] dark:text-[#C2B3E4]">
            Picked — in the garden
          </p>

          <button
            type="button"
            onClick={handlePick}
            disabled={busy}
            className="text-xs font-bold text-muted-foreground underline underline-offset-2 transition hover:text-[#1E1A2F] disabled:opacity-50 dark:text-[#9C94BC] dark:hover:text-foreground"
          >
            Unpick
          </button>
        </div>
      )}


      <div className="mt-4 flex items-center gap-2">

        {isUnplanted ? (

          <AlertDialog open={plantOpen} onOpenChange={setPlantOpen}>

            <AlertDialogTrigger
              render={
                <button
                  type="button"
                  disabled={busy}
                  className="pink-button py-2 text-sm"
                >
                  Plant
                </button>
              }
            />

            <AlertDialogContent className="dialog-box">

              <AlertDialogHeader>

                <AlertDialogTitle className="dialog-title">
                  Where should it go?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Plant it in your garden for everyone to see, or keep it in
                  your collection without it growing on the plot. Either way
                  it stays yours.
                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-col gap-2 rounded-b-3xl sm:grid sm:grid-cols-2">

                <AlertDialogCancel className="rounded-full">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  variant="outline"
                  onClick={() => handlePlant(false)}
                  className="rounded-full"
                >
                  Just my collection
                </AlertDialogAction>

                <AlertDialogAction
                  onClick={() => handlePlant(true)}
                  className="rounded-full sm:col-span-2"
                >
                  Plant in the garden
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

        ) : (

          !flower.picked && (
            <button
              type="button"
              onClick={handlePick}
              disabled={busy}
              className="pink-button py-2 text-sm disabled:opacity-50"
            >
              Pick
            </button>
          )

        )}


        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>

          <AlertDialogTrigger
            render={
              <button
                type="button"
                disabled={busy}
                className="icon-button"
                title="Delete flower"
              >
                <Trash2 size={14} />
              </button>
            }
          />

          <AlertDialogContent className="dialog-box">

            <AlertDialogHeader>

              <AlertDialogTitle className="dialog-title">
                {isUnplanted ? "Throw this flower away?" : "Delete this flower?"}
              </AlertDialogTitle>

              <AlertDialogDescription>
                {isUnplanted
                  ? "It will not go to your collection. The poke it came from stays in your history."
                  : "It leaves your collection and your garden for good. The poke it came from stays in your history."}
              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter className="rounded-b-3xl">

              <AlertDialogCancel className="rounded-full">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={handleDelete}
                className="rounded-full"
              >
                {isUnplanted ? "Throw away" : "Delete"}
              </AlertDialogAction>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialog>

      </div>

    </div>
  );
}


export default FlowerCard;
