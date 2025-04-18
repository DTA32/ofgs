"use client";
import GameList from "@/components/GameList";

export default function Home() {
  return (
    <main className="flex flex-col max-w-5xl mx-auto w-full justify-center">
      <div className="flex mt-1 mb-8 w-full">
        <GameList/>
      </div>
    </main>
  );
}
