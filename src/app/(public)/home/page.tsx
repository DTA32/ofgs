"use client";
import GameList from "@/components/GameList";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col container mx-auto w-full items-center">
      <div className="flex flex-1 mt-1 mb-8 w-full max-w-5xl">
        <GameList/>
      </div>
    </main>
  );
}
