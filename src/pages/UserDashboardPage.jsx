import { useEffect, useState } from "react";
import { format } from "date-fns";

import service from "@/services/index.service.js";

import Navbar from "@/components/layout/Navbar.jsx";
import CheckInCard from "@/components/checkin/CheckInCard.jsx";
import CircleCard from "@/components/circle/CircleCard.jsx";
import Loader from "@/components/shared/Loader.jsx";

function UserDashboardPage() {

  const [circle, setCircle] = useState([]);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const localDate = format(new Date(), "dd.MM.yyyy");

      const circleResponse = await service.get("/connections", {
        params: { localDate },
      });
      setCircle(circleResponse.data.myCircle || []);

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


  return (
    <div className="min-h-screen bg-background dark:bg-[#1D1739]">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-5 pt-20 pb-28 md:max-w-5xl md:px-8 md:pt-24 md:pb-14">
        <div className="md:grid md:grid-cols-[1.05fr_.95fr] md:items-start md:gap-6">

          <CheckInCard />

          <CircleCard circle={circle} />

        </div>
      </div>
    </div>
  );
}


export default UserDashboardPage;
