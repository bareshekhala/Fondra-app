import { useEffect, useState, useContext } from "react";
import { format } from "date-fns";

import service from "@/services/index.service.js";
import { AuthContext } from "@/context/auth.context.jsx";

import Navbar from "@/components/layout/Navbar.jsx";
import CheckInCard from "@/components/checkin/CheckInCard.jsx";
import CircleCard from "@/components/circle/CircleCard.jsx";
import ConnectionMap from "@/components/circle/ConnectionMap.jsx";
import GardenPeekCard from "@/components/garden/GardenPeekCard.jsx";
import NotificationsCard from "@/components/notifications/NotificationsCard.jsx";
import Loader from "@/components/shared/Loader.jsx";

function UserDashboardPage() {
  const { user, getUser } = useContext(AuthContext);

  const [circle, setCircle] = useState([]);
  const [garden, setGarden] = useState([]);
  const [unplanted, setUnplanted] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  //get -> location 
  //the user has an option to call this function later if her location changes => so with this we avoid multiple requests that are sent to the ip service provider and also have an updated ip at the same time 
  const refreshLocation = async () => {
    await service.get("/auth/location");
    await getUser();
  };

  const getData = async () => {
    try {
      const localDate = format(new Date(), "dd.MM.yyyy");

      if (user.location.latitude === null) {
        try {
          await refreshLocation();
        } catch (error) {
          console.log(error);
        }
      }

      const circleResponse = await service.get("/connections", {
        params: { localDate },
      });
      setCircle(circleResponse.data.myCircle || []);

      const gardenResponse = await service.get("/garden");
      setGarden(gardenResponse.data.garden || []);

      const pokesResponse = await service.get("/pokes/unplanted");
      setUnplanted((pokesResponse.data.pokes || []).length);

      const notificationsResponse = await service.get("/notifications");
      setNotifications(notificationsResponse.data.notifications || []);
      setUnread(notificationsResponse.data.unread || 0);

      if (notificationsResponse.data.unread > 0) {
        await service.patch("/notifications/read");
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const firstName = user ? user.name.split(" ")[0] : "";
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 5) {
    greeting = "Still up";
  } else if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  return (
    <div className="font-body min-h-screen bg-[#F4F1EC] dark:bg-[#14112B]">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-5 pt-20 pb-28 md:max-w-6xl md:px-8 md:pt-24 md:pb-14">
        <header className="mb-6">
          <h1 className="font-display text-4xl text-[#1E1A2F] dark:text-[#F1ECFA] md:text-[40px]">
            {greeting}, <span className="italic">{firstName}</span>
            {hour < 5 ? "?" : ""}
          </h1>

          <p className="mt-2 text-sm font-medium text-muted-foreground dark:text-[#9C94BC]">
            Your people are around you. You don't have to say much.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="min-w-0 md:col-span-8">
            <ConnectionMap
              circle={circle}
              onRefreshLocation={refreshLocation}
            />
          </div>

          <div className="md:col-span-4">
            <CheckInCard />
          </div>

          <div className="md:col-span-5">
            <CircleCard circle={circle} />
          </div>

          <div className="md:col-span-4">
            <GardenPeekCard flowers={garden} unplanted={unplanted} />
          </div>

          <div className="md:col-span-3">
            <NotificationsCard notifications={notifications} unread={unread} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
