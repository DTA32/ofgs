"use client";
import GameList from "@/components/GameList";
import HomeHeader from "@/components/HomeHeader";

export default function Home() {
  return (
      <div className="flex flex-col max-w-5xl px-8 mx-auto w-full justify-center">
        <HomeHeader/>
        <main className="flex-1">
          <div className="flex mt-1 w-full">
            <GameList />
          </div>
        </main>
      </div>
  );
}
