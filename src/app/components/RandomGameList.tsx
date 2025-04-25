"use client";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";
import {useEffect, useState} from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/games/data/getRandom";

export default function GameList() {
  const [data, setData] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiURL);
        if (!res.ok) {
          throw new Error(`Error from API: ${res.status}`);
        }
        const json = await res.json();
        setData(json as Game[]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading)
    return <div className="md:text-center pt-4 text-lg">Loading...</div>;
  if (error || !data)
    return (
      <div className="m-6 text-center">
        <h3 className="text-lg pt-4">
          Error while fetching data, please try again later.
        </h3>
      </div>
    );

  return (
    <div>
      <p className="text-lg mb-4">Random suggestions</p>
      <div className="flex flex-wrap gap-6">
        {data.map((game: Game) => (
          <Card key={game.nameID} game={game} isMini={true}/>
        ))}
      </div>
    </div>
  );
}
