import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import service from "@/services/index.service.js";

import Navbar from "@/components/layout/Navbar.jsx";
import FlowerCard from "@/components/garden/FlowerCard.jsx";
import Loader from "@/components/shared/Loader.jsx";


function UnplantedPage() {

  const [pokes, setPokes] = useState([]);
  const [loading, setLoading] = useState(true);


  const getData = async () => {
    try {
      const pokesResponse = await service.get("/pokes/unplanted");
      setPokes(pokesResponse.data.pokes);

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
          Unplanted flowers
        </h1>

        <p className="mt-1 text-sm font-medium text-muted-foreground dark:text-[#9C92C4]">
          {pokes.length} {pokes.length === 1 ? "flower" : "flowers"} waiting for you to decide.
        </p>


        {pokes.length === 0 ? (
          <div className="glass-card mt-6 px-6 py-12 text-center">
            <p className="mx-auto max-w-xs text-sm text-muted-foreground dark:text-[#9C92C4]">
              Nothing waiting. When you poke someone back, their flower lands here.
            </p>

            <Link
              to="/garden/collection"
              className="pink-button mt-5 inline-block py-3 text-sm"
            >
              See my collection
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {pokes.map((poke) => (
              <FlowerCard
                key={poke._id}
                flower={poke}
                variant="unplanted"
                onChanged={getData}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}


export default UnplantedPage;
