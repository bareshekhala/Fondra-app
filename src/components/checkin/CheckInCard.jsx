import { useContext, useEffect, useState } from "react";
import { format, formatDistanceToNowStrict, isToday } from "date-fns";

import service from "@/services/index.service.js";
import { AuthContext } from "@/context/auth.context.jsx";
import { toast } from "@/components/ui/toast.jsx";

import lotus0 from "@/assets/lotus-0.svg";
import lotus1 from "@/assets/lotus-1.svg";
import lotus3 from "@/assets/lotus-3.svg";

import CheckIn from "@/components/checkin/CheckIn.jsx";
import NoteActions from "@/components/checkin/NoteActions.jsx";
import SocialActions from "@/components/checkin/SocialActions.jsx";


function CheckInCard() {

  const { user, getUser } = useContext(AuthContext);

  // we will pass this open to CheckIn component to control dialouge alert to be shown or not shown
  const [open, setOpen] = useState(false);
  
  const [todayCount, setTodayCount] = useState(null);
  const [todayLast, setTodayLast] = useState(null);
  const [lotusImg, setLotusImg] = useState(lotus0);

  
  
  // in the checkIn card there is a lotus with different stages -> it changes according to the time that has passed since the last check in
  useEffect(() => {
    if (!user || !user.lastCheckIn) {
      setLotusImg(lotus0);
      return;
    }
    const hours = (new Date() - new Date(user.lastCheckIn)) / (1000 * 60 * 60);
    if (hours < 12) {
      setLotusImg(lotus3);
    } else if (hours < 24) {
      setLotusImg(lotus1);
    } else {
      setLotusImg(lotus0);
    }
  }, [user]);

// in here the number of checkins in a specific day is counted -> the count part is in the backend and we just need to provide the localDate
  const loadToday = async () => {
    try {
      const localDate = format(new Date(), "dd.MM.yyyy");
      const response = await service.get(`/checkins/today?localDate=${localDate}`);

      setTodayCount(response.data.count);
      setTodayLast(response.data.last);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadToday();
  }, []);

  const openCheckIn = () => {
    if (todayCount >= 5) {
      toast.add({
        type: "warning",
        description: "You've already checked in 5 times today",
      });
      return;
    }

    setOpen(true);
  };


  const handleSaved = async () => {
    await loadToday();
    getUser();
  };



  let lastCheckIn = "no check-ins yet";
  let doneToday = false;

  if (user && user.lastCheckIn) {
    lastCheckIn = `${formatDistanceToNowStrict(new Date(user.lastCheckIn))} ago`;
    doneToday = isToday(new Date(user.lastCheckIn));
  }



  return (
    <>
      <section className="glass-card px-6 py-8 text-center md:py-10">

        <p className="auth-eyebrow">Today</p>

        <button
          type="button"
          onClick={openCheckIn}
          className="relative mx-auto mt-4 flex h-48 w-48 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-60 md:h-52 md:w-52"
        >
          <span
            className="absolute inset-0 rounded-full dark:opacity-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,.9) 0%, rgba(251,220,234,.5) 45%, rgba(222,123,158,.12) 70%, transparent 100%)",
            }}
          />

          <span
            className="absolute inset-0 rounded-full opacity-0 dark:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,240,247,.85) 0%, rgba(242,162,196,.32) 45%, rgba(163,141,240,.14) 70%, transparent 100%)",
            }}
          />

          <img
            src={lotusImg}
            alt="Lotus"
            width={124}
            className="relative"
          />
        </button>


        <h1 className="mt-5 font-display text-3xl text-[#1E1A2F] dark:text-[#F1ECFA]">
          {doneToday ? "Still here." : "Ready when you are"}
        </h1>

        <p className="mt-1 text-sm font-medium text-[#4A4462] dark:text-[#CFC6E6]">
          {doneToday
            ? `Checked in ${lastCheckIn}.`
            : "One tap. Nothing to write unless you want to."}
        </p>

        {doneToday && todayLast && (
          <div className="mx-auto mt-4 max-w-xs rounded-2xl bg-background px-4 py-3 text-left dark:bg-white/8">
            <p className="text-xs font-bold text-muted-foreground dark:text-[#9C94BC]">
              {todayLast.mood}
            </p>

            {todayLast.watchOut && (
              <p className="mt-1 text-xs font-bold text-[#3E6B4E] dark:text-[#9CC7AA]">
                Watch over me
                {todayLast.watchOutAt && ` · until ${format(new Date(todayLast.watchOutAt), "HH:mm")}`}
              </p>
            )}

            <NoteActions
              key={`note-${todayLast._id}`}
              checkInId={todayLast._id}
              savedNote={todayLast.note}
            />

            <SocialActions
              key={`social-${todayLast._id}`}
              checkInId={todayLast._id}
              savedSocial={todayLast.social}
            />
          </div>
        )}


        <button
          type="button"
          onClick={openCheckIn}
          className="pink-button mx-auto mt-6 block w-full max-w-xs py-4 text-[15px] disabled:opacity-50"
        >
          {doneToday ? "Check in again" : "Check in"}
        </button>

        <p className="mt-3 text-xs text-muted-foreground dark:text-[#9C94BC]">
          You can check in 5 times a day
          {todayCount !== null && ` · ${todayCount} used today`}
        </p>

      </section>


      <CheckIn
        open={open}
        setOpen={setOpen}
        handleSaved={handleSaved}
      />
    </>
  );
}


export default CheckInCard;
