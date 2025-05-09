"use client"
import Link from "next/link";
import GamePlayer from "@/components/GamePlayer";
import Heart from "@/app/icons/Heart";
import RandomGameList from "@/components/RandomGameList";
import Game from "@/interfaces/Game";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "@/app/indexeddb/db.model";

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/games/data/get/";

export default function Page({params}: { params: { nameID: string } }) {
  const [data, setData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFavoritedOnDB = useLiveQuery(() => db.favorites.where('gameId').equals(params.nameID).count());
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await db.favorites.where('gameId').equals(params.nameID).delete();
      setIsFavorite(false);
    } else {
      await db.favorites.add({
        gameId: params.nameID,
        favoritedAt: new Date(),
      });
      setIsFavorite(true);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiURL + params.nameID);
        if (!res.ok) {
          throw new Error(`Error from API: ${res.status}`);
        }
        const json = await res.json();
        const processedData = json as Game;
        setData(processedData);
        if (processedData) {
          document.title = `${processedData.title} - DFGS`;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      document.title = "DFGS";
    }
  }, [params.nameID]);
  useEffect(() => {
    if (isFavoritedOnDB && isFavoritedOnDB > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [isFavoritedOnDB]);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center">
        <p className="text-4xl">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Error</h1>
          <h3 className="text-xl">
            Error while fetching data, maybe my server is down, hehe. <br/>
            Please try again later.
          </h3>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button onClick={() => {
            router.refresh()
          }} className="underline">Refresh
          </button>
          <p>or</p>
          <Link className="px-4 py-1 rounded-lg bg-orange text-cream" href="/home">Return to Home</Link>
        </div>
      </div>
    );
  if (!data)
    return (
      <div className="container px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Game not found</h1>
          <h3 className="text-xl">
            Requested game not found, it&apos;s probably deleted, error/bug in the code, or idk? 🤷‍♂️
          </h3>
        </div>
        <div className="flex justify-center">
          <Link className="px-6 py-3 rounded-lg bg-orange text-cream" href="/home">Return to Home</Link>
        </div>
      </div>
    );
  const loadedData = data;
  return (
    <main className="flex flex-col container px-8 mx-auto w-full justify-center gap-2 text-brown-darker">
      <Link href="/home" className="text-sm">← Return to home</Link>
      <div className="flex flex-col gap-6 w-full mb-12">
        <GamePlayer game={loadedData}/>
        <div className="flex flex-col md:flex-row gap-12">
          <section className="flex flex-col gap-12 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-center gap-4">
                  <div className="flex flex-col md:flex-row md:gap-6">
                    <h1 className="text-4xl mb-1.5">{loadedData.title}</h1>
                    <div className="flex content-center items-center">
                          <span
                            className={`
                                ${
                              loadedData.status.type === 0
                                ? "bg-orange-dark text-cream"
                                : loadedData.status.type === 1
                                  ? "bg-orange"
                                  : "hidden"
                            } px-2 py-1 rounded-md text-sm whitespace-nowrap
                              `}
                          >
                              {loadedData.status.name}
                          </span>
                    </div>
                  </div>
                  <button onClick={handleFavoriteClick}>
                    <Heart width={32} height={32} svgClass={"text-brown-dark"} isClicked={isFavorite}/>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loadedData.category.map((cat) => (
                    <Link 
                      href={{
                        pathname: `/home`,
                        query: {
                          category: cat,
                        },
                      }}
                      className="py-1 px-4 bg-brown-darker text-cream rounded-md" 
                      key={cat}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row text-sm gap-2">
                <p>Developer:</p>
                <p>Publisher:</p>
              </div>
              <h3 className="text-xl">{loadedData.description}</h3>
            </div>
            <p>
              Disclaimer: I respect the rights of all developers/publishers.
              If you held right of this game and do not wish for it to be shown here, please reach out to me
              via <Link className="underline" href="/about#contact">one of my contact link</Link>,
              and i&apos;ll remove it. See full disclaimer&nbsp;
              <Link className="underline" href="/about#disclaimer">here</Link>
            </p>
          </section>
          <aside className="w-full max-w-[324px]">
            <RandomGameList/>
          </aside>
        </div>
      </div>
    </main>
  );
}