import FavoriteGames from "@/app/(public)/favorite/FavoriteGames";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Favorite Games",
};

export default function Favorite() {
  return (
    <main className="flex flex-1 flex-col container mx-auto w-full items-center">
      <div className="flex flex-1 flex-col gap-4 mb-8 w-full">
        <h1 className="text-2xl text-center">Favorite Games</h1>
        <FavoriteGames/>
      </div>
    </main>
  );
}