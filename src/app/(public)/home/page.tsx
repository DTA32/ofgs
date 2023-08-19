"use client";
import GameList from "@/components/GameList";

export default function Home() {
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
      <div className="flex justify-center my-4">
        <GameList />
      </div>
    </main>
  );
}
