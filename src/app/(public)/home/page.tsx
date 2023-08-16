"use client";
import { useState, useEffect } from "react";
import Card from "../../components/Card";

export default function Home() {
  interface Game {
    nameID: string;
    title: string;
  }
  const [games, setGames] = useState<Game[]>([]);
  const getGames = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "data/get");
    const data = await res.json();
    setGames(data);
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <main>
      <div id="title" className="py-3">
        <h1 className="text-center text-4xl mb-1.5">
          DTA32`s Old Flash Game Sites
        </h1>
        <h2 className="text-center text-2xl">
          Home for all of my favorite flash games :)
        </h2>
      </div>
      <div className="md:mx-20 my-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-24 gap-y-12 justify-items-center">
          {games.map((game) => (
            <Card
              key={game.nameID}
              data={{ title: game.title, nameID: game.nameID }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
