"use client";
import GameList from "@/components/GameList";

export default function Home() {
  return (
    <main className="flex-1">
      <div id="title" className="py-6 px-4 md:px-0">
        <h1 className="text-center text-4xl mb-1.5">
          DTA32&apos;s Flash Game Site
        </h1>
      </div>
      <div className="flex justify-center my-4">
        <GameList />
      </div>
    </main>
  );
}
