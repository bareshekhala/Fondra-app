import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import service from "@/services/index.service.js";

import Navbar from "@/components/layout/Navbar.jsx";
import GardenPlot from "@/components/garden/GardenPlot.jsx";
import Loader from "@/components/shared/Loader.jsx";


function GardenPage() {

  const [garden, setGarden] = useState([]);
  const [unplanted, setUnplanted] = useState(0);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const gardenResponse = await service.get("/garden");
      setGarden(gardenResponse.data.garden);

      const pokesResponse = await service.get("/pokes/unplanted");
      setUnplanted(pokesResponse.data.pokes.length);

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


  return (
    <div className="min-h-screen bg-background dark:bg-[#1D1739]">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-5 pt-20 pb-28 md:pt-24 md:pb-14">

        <h1 className="font-serif text-3xl italic text-[#211B3D] dark:text-foreground">
          Your garden
        </h1>

        <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
          Every poke back becomes a flower.
        </p>

        <p className="mt-2 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
          The plot holds 15 flowers, and shows your 15 newest picks. Want
          different ones out here?{" "}
          <Link
            to="/garden/collection"
            className="font-bold text-[#7C6BD4] underline underline-offset-2 dark:text-[#A38DF0]"
          >
            Pick them in your collection
          </Link>
          
        </p>


        <div className="mt-6">
          <GardenPlot flowers={garden} />
        </div>



        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <Link
            to="/garden/collection"
            className="glass-card px-6 py-6 transition hover:bg-white dark:hover:bg-white/12"
          >
            <p className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
              My collection
            </p>

            <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
              {garden.length} {garden.length === 1 ? "flower" : "flowers"} kept
            </p>
          </Link>

          <Link
            to="/garden/unplanted"
            className="glass-card px-6 py-6 transition hover:bg-white dark:hover:bg-white/12"
          >
            <p className="font-serif text-2xl italic text-[#211B3D] dark:text-foreground">
              Unplanted flowers
            </p>

            <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
              {unplanted} waiting for you
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}


export default GardenPage;
