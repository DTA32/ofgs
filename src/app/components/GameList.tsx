"use client";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";
import ChevronDown from "@/app/icons/ChevronDown";
import {useEffect, useState} from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/games/data/get";
const pageLimit = 9;

export default function GameList() {
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const fetchData = async (page: number) => {
    setIsPaginationLoading(true);
    try {
      const res = await fetch(`${apiURL}?page=${page}&limit=${pageLimit}`);
      if (!res.ok) {
        throw new Error(`Error from API: ${res.status}`);
      }
      const json = await res.json();
      const gameData = json.data;
      setData((prevData) => [...prevData, ...gameData]);
      if (json.maxPage === page) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setIsPaginationLoading(false);
    }
  }
  useEffect(() => {
    fetchData(page);
  }, [page])

  if (error)
    return (
      <div className="w-full flex flex-col text-center place-content-center">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, maybe my server is down, hehe. <br/>Please try again later.
        </h3>
      </div>
    );
  
  if (data.length === 0)
    return (
      <div className="w-full flex flex-col place-content-center">
        <p className="text-center text-4xl">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-4 w-full">
          <button type="submit" className="text-lg px-6 py-2 text-cream bg-brown-dark rounded-lg">All</button>
          <button type="submit"
                  className="text-lg px-6 py-2 text-brown-darker hidden md:block border border-brown-dark rounded-lg">Racing
          </button>
          <button type="submit"
                  className="text-lg px-6 py-2 text-brown-darker hidden md:block border border-brown-dark rounded-lg">Platformer
          </button>
          <div className="flex items-center relative">
            <select
              className="text-lg px-4 py-2 text-brown-darker w-36 border border-brown-dark rounded-lg appearance-none bg-cream-light">
              <option selected={true} disabled={true}>Other</option>
            </select>
            <button className="flex items-center absolute right-2.5">
              <ChevronDown width={32} height={32} svgClass="text-brown-darker"/>
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 justify-items-center">
          {data.map((game: Game) =>
            <Card key={game.nameID} game={game} isMini={false}/>
          )}
        </div>
      </div>
      <div className="flex justify-center align-center text-center text-xl">
        {isPaginationLoading && <p>Loading...</p>}
        {(!isReachingEnd && !isPaginationLoading) && (
          <button
            className="py-2 px-8 rounded-lg bg-orange text-cream"
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
            }}
          >
            Load more
          </button>
        )}
        {isReachingEnd && <p className="text-sm">No more games :(</p>}
      </div>
    </div>
  );
}
