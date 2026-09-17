import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const { user, getUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [busy, setBusy] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
const [name, setName] = useState(user ? user.name : "")

//for profile picture -> post
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

  //for profile picture -> delete
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

//for editing the name -> post
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

// delete account
  const handleDeleteAccount = async () => {
    setDeleteOpen(false);
    setBusy(true);

    try {
      await toast.promise(service.delete("/users/delete-account"), {
        loading: "Deleting your account…",
        success: "Your account is gone. Take care.",
        error: showError,
      });

      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  return (
    <div className="font-body min-h-screen bg-[#F4F1EC] dark:bg-[#14112B]">
      <Navbar />

      <div className="mx-auto w-full max-w-md px-5 pt-20 pb-28 md:pt-24 md:pb-14">
        <section className="glass-card px-6 py-8 text-center">
          <div className="flex justify-center">
            <Avatar user={user} size={120} />
          </div>

          <h1 className="mt-5 font-display text-3xl text-[#1E1A2F] dark:text-foreground">
            {user ? `${user.name}` : ""}
          </h1>

          <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C94BC]">
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
          <h2 className="font-display text-xl text-[#1E1A2F] dark:text-foreground">
            Your name
          </h2>

          <p className="mt-1 text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
            This is how your people see you. Your username stays the same.
          </p>

          <form onSubmit={handleRename} className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-[#1E1A2F] dark:text-gray-100">
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

            <p className="text-right text-[11px] text-muted-foreground dark:text-[#9C94BC]">
              {name.length} / 40
            </p>
          </form>
        </section>

        <section className="glass-card mt-4 px-6 py-6">
          <h2 className="font-display text-xl text-[#1E1A2F] dark:text-foreground">
            Delete account
          </h2>

          <p className="mt-1 text-xs font-medium text-muted-foreground dark:text-[#9C94BC]">
            Your check-ins, pokes, garden and circle go with it. There is no undo.
          </p>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger
              render={
                <button
                  type="button"
                  disabled={busy}
                  className="mt-4 rounded-full border border-red-300 px-5 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-400/40 dark:text-red-300 dark:hover:bg-red-400/10"
                >
                  Delete my account
                </button>
              }
            />

            <AlertDialogContent className="dialog-box">
              <AlertDialogHeader>
                <AlertDialogTitle className="dialog-title">
                  Delete your account?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Everything you have here is removed for good: your profile,
                  check-ins, pokes, flowers and the people in your circle.
                  Are you sure?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="rounded-b-3xl">
                <AlertDialogCancel className="rounded-full">
                  Keep my account
                </AlertDialogCancel>

                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="rounded-full"
                >
                  Yes, delete everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>

        <Link
          to="/dashboard"
          className="mt-6 block text-center text-sm font-medium text-muted-foreground dark:text-[#9C94BC]"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
