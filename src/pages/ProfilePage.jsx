import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import service from "@/services/index.service.js";
import { AuthContext } from "@/context/auth.context.jsx";

import Navbar from "@/components/layout/Navbar.jsx";
import Avatar from "@/components/shared/Avatar.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { toast } from "@/components/ui/toast.jsx";
import showError from "@/utils/showError.js";

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

const MAX_SIZE = 3 * 1024 * 1024;

function ProfilePage() {
  const { user, getUser } = useContext(AuthContext);

  const [busy, setBusy] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
const [name, setName] = useState(user ? user.name : "")


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";

    if (!file) {
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.add({
        type: "error",
        description: "The picture must be smaller than 3 MB",
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setBusy(true);

    try {
      await toast.promise(service.post("/upload/avatar", formData), {
        loading: "Uploading your picture…",
        success: "Looking good",
        error: showError,
      });

      getUser(); 
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    setRemoveOpen(false);
    setBusy(true);

    try {
      await toast.promise(service.delete("/upload/avatar"), {
        loading: "Removing your picture…",
        success: "Picture removed",
        error: showError,
      });

      getUser();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };


  const handleRename = async (e) => {
  e.preventDefault();
  if (name.trim() === user.name)
    return;

  setBusy(true);
  try {
    await toast.promise(service.patch("/users/me", { name }), {
      loading: "Saving…",
      success: "Name updated",
      error: showError,
    });
    getUser();
  } catch (error) {
    console.log(error);
  }
  setBusy(false);
};

  return (
    <div className="min-h-screen bg-background dark:bg-[#1D1739]">
      <Navbar />

      <div className="mx-auto w-full max-w-md px-5 pt-20 pb-28 md:pt-24 md:pb-14">
        <section className="glass-card px-6 py-8 text-center">
          <div className="flex justify-center">
            <Avatar user={user} size={120} />
          </div>

          <h1 className="mt-5 font-serif text-3xl italic text-[#211B3D] dark:text-foreground">
            {user ? `${user.name}` : ""}
          </h1>

          <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
            {user ? `@${user.username}` : ""}
          </p>

          <label
            className={`pink-button mx-auto mt-6 block w-full max-w-xs cursor-pointer py-3 text-center text-[15px] ${
              busy ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {busy
              ? "Working…"
              : user && user.avatar
                ? "Change picture"
                : "Upload a picture"}
                
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleUpload}
              disabled={busy}
              className="hidden"
            />
          </label>

          {user && user.avatar && (
            <AlertDialog open={removeOpen} onOpenChange={setRemoveOpen}>
              <AlertDialogTrigger
                render={
                  <button
                    type="button"
                    disabled={busy}
                    className="add-button mt-4"
                  >
                    Remove picture
                  </button>
                }
              />

              <AlertDialogContent className="dialog-box">
                <AlertDialogHeader>
                  <AlertDialogTitle className="dialog-title">
                    Remove your picture?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Your circle will see your initials instead until you
                    upload a new one.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="rounded-b-3xl">
                  <AlertDialogCancel className="rounded-full">
                    Cancel
                  </AlertDialogCancel>

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
          )}
        </section>

        <section className="glass-card mt-4 px-6 py-6">
          <h2 className="font-serif text-xl italic text-[#211B3D] dark:text-foreground">
            Your name
          </h2>

          <p className="mt-1 text-xs font-medium text-muted-foreground dark:text-[#9C92C4]">
            This is how your people see you. Your username stays the same.
          </p>

          <form onSubmit={handleRename} className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-[#403A5D] dark:text-gray-100">
              Name
            </Label>

            <div className="flex gap-2">
              <Input
                id="name"
                type="text"
                value={name}
                maxLength={40}
                placeholder="Your name"
                disabled={busy}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-full dark:text-[#dfdcec]"
              />

              <button
                type="submit"
                disabled={busy || !name.trim() || name.trim() === user.name}
                className="pink-button shrink-0 py-2 text-sm disabled:pointer-events-none disabled:opacity-50"
              >
                Save
              </button>
            </div>

            <p className="text-right text-[11px] text-muted-foreground dark:text-[#9C92C4]">
              {name.length} / 40
            </p>
          </form>
        </section>

        <Link
          to="/dashboard"
          className="mt-6 block text-center text-sm font-medium text-muted-foreground dark:text-[#9C92C4]"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
