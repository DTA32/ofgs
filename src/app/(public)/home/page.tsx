"use client";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const getGames = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/data/get");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error(
        "Fetching data from server error, perhaps you forgot to start the server?"
      );
    }
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <main>
      <div id="title" className="py-3">
        <h1 className="text-center text-4xl mb-1.5">
          DTA32&apos;s Flash Game Sites
        </h1>
        <h2 className="text-center text-2xl">
          Home for all of my favorite flash games :)
        </h2>
      </div>
      <div className="md:mx-12 my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12 justify-items-center">
          {games.map((game) => (
            <Card key={game.nameID} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}
