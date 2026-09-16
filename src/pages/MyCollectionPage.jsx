import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import service from "@/services/index.service.js";

import Navbar from "@/components/layout/Navbar.jsx";
import FlowerCard from "@/components/garden/FlowerCard.jsx";
import Loader from "@/components/shared/Loader.jsx";


function MyCollectionPage() {

  const [garden, setGarden] = useState([]);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const gardenResponse = await service.get("/garden");
      setGarden(gardenResponse.data.garden);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  if (loading) {
    return <Loader />;
  }


  const inGarden = garden.filter((flower) => flower.picked).length;


  return (
    <div className="min-h-screen bg-background dark:bg-[#1D1739]">
      <Navbar />

      <div className="mx-auto w-full max-w-4xl px-5 pt-20 pb-28 md:pt-24 md:pb-14">

        <Link
          to="/garden"
          className="text-sm font-medium text-muted-foreground dark:text-[#9C92C4]"
        >
          ← Back to the garden
        </Link>

        <h1 className="mt-3 font-serif text-3xl italic text-[#211B3D] dark:text-foreground">
          My collection
        </h1>

        <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
          {garden.length === 1
            ? "1 flower, from someone who thought of you"
            : `${garden.length} flowers, each one from someone who thought of you`}

          {garden.length > 0 && ` · ${inGarden} of 15 picked for the garden`}
        </p>


        {garden.length === 0 ? (
          <div className="glass-card mt-6 px-6 py-12 text-center">
            <p className="mx-auto max-w-xs text-sm text-muted-foreground dark:text-[#9C92C4]">
              Nothing kept yet. When someone pokes you back, plant their flower and it shows up here.
            </p>

            <Link
              to="/garden/unplanted"
              className="pink-button mt-5 inline-block py-3 text-sm"
            >
              See unplanted flowers
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {garden.map((flower) => (
              <FlowerCard
                key={flower._id}
                flower={flower}
                variant="collection"
                onChanged={getData}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}


export default MyCollectionPage;
