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
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import showError from "@/utils/showError.js";

//props came from CheckInCard
function NoteActions({ checkInId, savedNote }) {

  const [note, setNote] = useState(savedNote);
  const [draft, setDraft] = useState(savedNote);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleEditOpenChange = (open) => {
    if (open) {
      setDraft(note);
    }
    setEditOpen(open);
  };


  const handleDraftChange = (e) => {
    setDraft(e.target.value);
  };

//patch -> new note
  const handleSave = async (e) => {
    e.preventDefault();

    const newNote = draft.trim();

    setEditOpen(false);
    setBusy(true);

    try {
      await toast.promise(
        service.patch(`/checkins/${checkInId}`, { note: newNote }),
        {
          loading: "Saving your note…",
          success: "Note saved",
          error: showError,
        }
      );

      setNote(newNote);
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
        service.patch(`/checkins/${checkInId}`, { note: "" }),
        {
          loading: "Deleting your note…",
          success: "Note deleted",
          error: showError,
        }
      );

      setNote("");
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  return (
    <div className="mt-2 flex items-start justify-between gap-3">

      {note ? (
        <p className="min-w-0 font-serif text-[15px] italic text-[#453D6B] dark:text-[#C6BCE6]">
          "{note}"
        </p>
      ) : null}


      <div className="flex shrink-0 gap-2">

        <Dialog
          open={editOpen}
          onOpenChange={handleEditOpenChange}
        >

          <DialogTrigger
            render={
              note ? (
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
                  + Add note
                </button>
              )
            }
          />

          <DialogContent className="dialog-box sm:max-w-sm">

            <form onSubmit={handleSave}>

              <DialogHeader>

                <DialogTitle className="dialog-title">
                  {note ? "Edit your note" : "Add a note"}
                </DialogTitle>

                <DialogDescription>
                  Your circle will see it.
                </DialogDescription>

              </DialogHeader>


              <div className="mt-4 flex flex-col gap-2">

                <Label htmlFor="note">
                  Note
                </Label>

                <Input
                  id="note"
                  value={draft}
                  onChange={handleDraftChange}
                  maxLength={140}
                  autoFocus
                  placeholder="Write a note"
                  className="rounded-xl bg-background text-[#211B3D] dark:bg-white/5 dark:text-foreground"
                />

                <p className="text-right text-xs text-muted-foreground dark:text-[#9C92C4]">
                  {draft.length}/140 characters
                </p>

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
                  type="submit"
                  disabled={busy || draft.trim() === ""}
                  className="pink-button"
                >
                  Save
                </Button>

              </DialogFooter>

            </form>

          </DialogContent>

        </Dialog>

        {note && (
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
                  Delete your note?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Are you sure you want to delete your note? Your check-in
                  stays, only the note goes.
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
                  Delete
                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>
        )}

      </div>

    </div>
  );
}


export default NoteActions;
