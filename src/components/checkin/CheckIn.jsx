import { useState } from "react";
import { format } from "date-fns";

import service from "@/services/index.service.js";
import { toast } from "@/components/ui/toast.jsx";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";

import SocialPicker from "@/components/checkin/SocialPicker.jsx";
import { Calendar } from "@/components/ui/calendar.jsx";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx";
import { ChevronDownIcon } from "lucide-react";
import showError from "@/utils/showError.js";

function CheckIn({ open, setOpen, handleSaved }) {
  const [mood, setMood] = useState("I'm good");
  const [note, setNote] = useState("");
  const [social, setSocial] = useState("");
  const [watchOut, setWatchOut] = useState(false);
  const [watchOutDate, setWatchOutDate] = useState(undefined);
  const [watchOutTime, setWatchOutTime] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const watchOutAt = () => {
    if (!watchOutDate || !watchOutTime) {
      return null;
    }

    const [hours, minutes] = watchOutTime.split(":");
    const at = new Date(watchOutDate);
    at.setHours(Number(hours), Number(minutes), 0, 0);
    return at.toISOString();
  };
  const MOODS = ["I'm good", "Busy but okay", "Not great"];

  const handleMoodChange = (value) => {
    setMood(value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };


  //post -> checkIn
  const handleSave = async () => {
    setOpen(false);
    setBusy(true);

    //for doing a checkIn, localDate is required -> we need to know how many times in a specific day the user checks in, because there is a limit for number of check ins
    const localDate = format(new Date(), "dd.MM.yyyy");

    let body = {
      localDate: localDate,
      mood: mood,
      note: note,
      social: social,
      watchOut: watchOut,
      watchOutAt: watchOut ? watchOutAt() : null,
    };

    try {
      await toast.promise(service.post("/checkins", body), {
        loading: "Saving your check-in…",
        success: "You just checked-in successfully",
        error: showError,
      });

      setNote("");
      setWatchOut(false);
      setWatchOutDate(undefined);
      setWatchOutTime("");
      handleSaved();
      setBusy(false);
    } catch (error) {
      console.log(error);
      setBusy(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dialog-box max-w-md p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="dialog-title">
            How are you doing?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <RadioGroup
          value={mood}
          onValueChange={handleMoodChange}
          className="flex flex-col gap-3"
        >
          {MOODS.map((m) => (
            <label
              key={m}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                mood === m
                  ? "border-[#7C6BD4] bg-[#7C6BD4]/8 dark:border-[#A38DF0] dark:bg-white/10"
                  : "border-black/8 hover:bg-black/2 dark:border-white/12 dark:hover:bg-white/5"
              }`}
            >
              <RadioGroupItem value={m} />

              <span className="font-bold text-[#1E1A2F] dark:text-foreground">
                {m}
              </span>
            </label>
          ))}
        </RadioGroup>

        <div className="flex flex-col gap-2">
          <Textarea
            value={note}
            onChange={handleNoteChange}
            maxLength={140}
            placeholder="Add a note (optional)"
            className="min-h-24 resize-none rounded-xl bg-background text-[#1E1A2F] dark:bg-white/5 dark:text-foreground"
          />

          <p
            className="
            text-right
            text-xs
            text-muted-foreground
            dark:text-[#9C94BC]
          "
          >
            {note.length}/140 characters
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-muted-foreground dark:text-[#9C94BC]">
            Social energy (optional)
          </p>

          <SocialPicker value={social} onChange={setSocial} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={watchOut}
              onChange={(e) => setWatchOut(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[#6F9A7E]"
            />

            <span>
              <span className="block text-sm font-bold text-[#1E1A2F] dark:text-foreground">
                Watch over me
              </span>
              <span className="block text-xs text-muted-foreground dark:text-[#9C94BC]">
                Heading somewhere alone? Your circle will know to check on you.
                Add a time if you want them to know by when.
              </span>
            </span>
          </label>

          {watchOut && (
            <FieldGroup className="flex-row pl-7">
              <Field>
                <FieldLabel htmlFor="watch-out-date">By when? (optional)</FieldLabel>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger
                    render={
                      <Button variant="outline" id="watch-out-date" className="w-36 justify-between font-normal">
                        {watchOutDate ? format(watchOutDate, "PPP") : "Select date"}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={watchOutDate}
                      defaultMonth={watchOutDate}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        setWatchOutDate(date);
                        setDateOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>

              <Field className="w-28">
                <FieldLabel htmlFor="watch-out-time">&nbsp;</FieldLabel>
                <Input
                  type="time"
                  id="watch-out-time"
                  value={watchOutTime}
                  onChange={(e) => setWatchOutTime(e.target.value)}
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </Field>
            </FieldGroup>
          )}
        </div>

        <AlertDialogFooter className="-mx-6 -mb-6 rounded-b-3xl px-6 pb-6">
          <AlertDialogCancel disabled={busy} className="rounded-full">
            Cancel
          </AlertDialogCancel>

          <Button
            type="button"
            onClick={handleSave}
            disabled={busy}
            className="pink-button"
          >
            {busy ? "Saving..." : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CheckIn;
