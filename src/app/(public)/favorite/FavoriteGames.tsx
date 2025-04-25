"use client";
import {useEffect, useState} from "react";
import Game from "@/interfaces/Game";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/app/indexeddb/db.model";
import Card from "@/components/Card";
import Heart from "@/app/icons/Heart";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/games/data/get/";

export default function FavoriteGames() {
  const [data, setData] = useState<Game[]>([]);
  const favoriteList = useLiveQuery(() => db.favorites.toArray())
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const deleteFavorite = async (gameId: string) => {
    await db.favorites.where('gameId').equals(gameId).delete();
    setData(prevData => prevData.filter(game => game.nameID !== gameId))
  };
  useEffect(() => {
    const favoriteGameIds = favoriteList?.map((game) => game.gameId);
    const fetchData = async () => {
      try {
        if(favoriteList){
          if(favoriteList.length === 0){
            setData([]);
          } else {
            const res = await fetch(`${apiURL}?ids=${favoriteGameIds}`);
            if (!res.ok) {
              throw new Error(`Error from API: ${res.status}`);
            }
            const json = await res.json();
            const gameData = json.data as Game[];
            gameData.sort((a, b) => {
              // @ts-ignore
              const aFavoritedAt = favoriteList.find((fav) => fav.gameId === a.nameID).favoritedAt;
              // @ts-ignore
              const bFavoritedAt = favoriteList.find((fav) => fav.gameId === b.nameID).favoritedAt;
              return bFavoritedAt.valueOf() - aFavoritedAt.valueOf();
            })
            setData(gameData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [favoriteList]);
  if (error) return (
    <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl">
          Error while fetching data, maybe my server is down, hehe. <br/>
          Please try again later.
        </h3>
      </div>
    </div>
  )
  if (isLoading) return (
    <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center">
      <p className="text-4xl">Loading...</p>
    </div>
  )
  if (data.length === 0) return (
    <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">No favorite games yet</h1>
        <h3 className="text-xl">
          Explore and favorite some games first
        </h3>
      </div>
    </div>
  )
  return (
    <div className="w-full flex flex-wrap gap-x-8 gap-y-12">
      {data.map((game: Game) =>
        <div key={game.nameID} className="relative flex">
          <Card key={game.nameID} game={game} isMini={false}/>
          <button className="absolute top-2 right-2" onClick={() => deleteFavorite(game.nameID)}>
            <Heart width={32} height={32} svgClass={"text-orange"} isClicked={true}/>
          </button>
        </div>
      )}
    </div>
  )
}