"use client";
import GameList from "@/components/GameList";
import CategorySelector from "@/app/(public)/home/CategorySelector";
import {useSearchParams} from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  return (
    <main className="flex flex-1 flex-col container mx-auto w-full items-center">
      <div className="flex flex-col gap-6 flex-1 mt-1 mb-8 w-full max-w-5xl">
        <CategorySelector selectedCategory={category}/>
        <GameList category={category} searchQuery={search}/>
      </div>
    </main>
  );
}
