import { useEffect, useState } from "react";
import { format } from "date-fns";

import service from "@/services/index.service.js";

import Navbar from "@/components/layout/Navbar.jsx";
import CircleMember from "@/components/circle/CircleMember.jsx";
import RequestRow from "@/components/circle/RequestRow.jsx";
import SentRow from "@/components/circle/SentRow.jsx";
import FindPeople from "@/components/circle/FindPeople.jsx";
import Loader from "@/components/shared/Loader.jsx";

function CirclePage() {

  const [circle, setCircle] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sent, setSent] = useState([]);
  const [tab, setTab] = useState("circle");
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const localDate = format(new Date(), "dd.MM.yyyy");

      const circleResponse = await service.get("/connections", {
        params: { localDate },
      });
      setCircle(circleResponse.data.myCircle || []);

      const requestsResponse = await service.get("/connections/requests");
      setRequests(requestsResponse.data.requests);

      const sentResponse = await service.get("/connections/sent");
      setSent(sentResponse.data.sent);

      // to show the loading page for 2 seconds
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  if (loading) {
    return <Loader />;
  }


  const tabs = [
    { key: "circle", label: "My circle", count: circle.length },
    { key: "requests", label: "Requests", count: requests.length },
    { key: "sent", label: "Sent", count: sent.length },
  ];


  return (
    <div className="font-body min-h-screen bg-[#F4F1EC] dark:bg-[#14112B]">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-5 pt-20 pb-28 md:pt-24 md:pb-14">

        <h1 className="font-display text-3xl text-[#1E1A2F] dark:text-foreground">
          Your circle
        </h1>

        <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C94BC]">
          The people who'd notice if you went quiet. You can poke each of them
          up to 5 times a day, and once an hour while they haven't answered.
        </p>

        <div className="mt-6 inline-flex gap-1 rounded-full border border-white/60 bg-white/70 p-1 backdrop-blur-md dark:border-white/12 dark:bg-white/8">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`relative rounded-full px-4 py-2 text-[13px] font-bold transition ${
                tab === t.key
                  ? "bg-white text-[#1E1A2F] shadow-[0_2px_8px_rgba(33,27,61,0.08)] dark:bg-[#1E1A3A] dark:text-foreground"
                  : "text-muted-foreground hover:text-[#1E1A2F] dark:text-[#9C94BC] dark:hover:text-foreground"
              }`}
            >
              {t.label}
              <span className="ml-1.5 font-medium">{t.count}</span>

              {t.key === "requests" && requests.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#F1D48A]" />
              )}
            </button>
          ))}
        </div>


        {/* My circle */}

        {tab === "circle" && (
          <div className="glass-card mt-3 px-5">
            {circle.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground dark:text-[#9C94BC]">
                Nobody here yet. Find someone below, or share your invite link.
              </p>
            ) : (
              <ul>
                {circle.map((otherUser) => (
                  <CircleMember
                    key={otherUser._id}
                    otherUser={otherUser}
                    onRemoved={getData}
                  />
                ))}
              </ul>
            )}
          </div>
        )}


        {/* Requests */}

        {tab === "requests" && (
          <div className="glass-card mt-3 px-5">
            {requests.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground dark:text-[#9C94BC]">
                No one is waiting for your answer.
              </p>
            ) : (
              <ul>
                {requests.map((request) => (
                  <RequestRow
                    key={request._id}
                    request={request}
                    onChanged={getData}
                  />
                ))}
              </ul>
            )}
          </div>
        )}


        {/* Sent */}

        {tab === "sent" && (
          <div className="glass-card mt-3 px-5">
            {sent.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground dark:text-[#9C94BC]">
                You haven't sent any requests.
              </p>
            ) : (
              <ul>
                {sent.map((request) => (
                  <SentRow
                    key={request._id}
                    request={request}
                    onChanged={getData}
                  />
                ))}
              </ul>
            )}
          </div>
        )}


        {/* Find people */}

        <div className="mt-8">
          <FindPeople
            circle={circle}
            requests={requests}
            sent={sent}
            onChanged={getData}
          />
        </div>

      </div>
    </div>
  );
}


export default CirclePage;
