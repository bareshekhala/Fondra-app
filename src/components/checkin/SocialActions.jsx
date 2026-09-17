import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";

import { Button } from "@/components/ui/button.jsx";

import SocialPicker from "@/components/checkin/SocialPicker.jsx";
import showError from "@/utils/showError.js";

//props come from CheckInCard
function SocialActions({ checkInId, savedSocial }) {

  const [social, setSocial] = useState(savedSocial);
  const [draft, setDraft] = useState(savedSocial);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [busy, setBusy] = useState(false);



  const handleEditOpenChange = (open) => {
    if (open) {
      setDraft(social);
    }
    setEditOpen(open);
  };

//patch-> new social energy
  const handleSave = async () => {
    setEditOpen(false);
    setBusy(true);

    try {
      await toast.promise(
        service.patch(`/checkins/${checkInId}`, { social: draft }),
        {
          loading: "Saving…",
          success: "Social energy saved",
          error: showError,
        }
      );

      setSocial(draft);
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  const handleDelete = async () => {
    setDeleteOpen(false);
    setBusy(true);

    try {
      await toast.promise(
        service.patch(`/checkins/${checkInId}`, { social: "" }),
        {
          loading: "Removing…",
          success: "Social energy removed",
          error: showError,
        }
      );

      setSocial("");
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  return (
    <div className="mt-2 flex items-start justify-between gap-3">

      {social ? (
        <p className="min-w-0 text-sm">
          <span className="block text-[11px] font-bold text-muted-foreground dark:text-[#9C94BC]">
            Social energy
          </span>

          <span className="font-bold text-[#6A59C4] dark:text-[#C2B3E4]">
            {social}
          </span>
        </p>
      ) : null}


      <div className="flex shrink-0 gap-2">


        <Dialog
          open={editOpen}
          onOpenChange={handleEditOpenChange}
        >

          <DialogTrigger
            render={
              social ? (
                <button
                  type="button"
                  disabled={busy}
                  className="icon-button"
                >
                  <Pencil size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  className="add-button"
                >
                  + Add social energy
                </button>
              )
            }
          />

          <DialogContent className="dialog-box sm:max-w-sm">

            <DialogHeader>

              <DialogTitle className="dialog-title">
                {social ? "Edit your social energy" : "How social are you today?"}
              </DialogTitle>

              <DialogDescription>
                Your circle will see it.
              </DialogDescription>

            </DialogHeader>


            <div className="mt-4">
              <SocialPicker
                value={draft}
                onChange={setDraft}
              />
            </div>


            <DialogFooter className="mt-4 rounded-b-3xl">

              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                }
              />

              <Button
                type="button"
                onClick={handleSave}
                disabled={busy || draft === ""}
                className="pink-button"
              >
                Save
              </Button>

            </DialogFooter>

          </DialogContent>

        </Dialog>


        {social && (
          <AlertDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          >

            <AlertDialogTrigger
              render={
                <button
                  type="button"
                  disabled={busy}
                  className="icon-button"
                >
                  <Trash2 size={14} />
                </button>
              }
            />

            <AlertDialogContent className="dialog-box">

              <AlertDialogHeader>

                <AlertDialogTitle className="dialog-title">
                  Remove your social energy?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Are you sure? Your circle won't see a social energy for you
                  until you set a new one.
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
                  Remove
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>
        )}

      </div>

    </div>
  );
}


export default SocialActions;
