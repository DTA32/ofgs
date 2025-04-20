"use client"
import Link from "next/link";
import GamePlayer from "@/components/GamePlayer";
import Heart from "@/app/icons/Heart";
import RandomGameList from "@/components/RandomGameList";
import useSWR from "swr";
import Game from "@/interfaces/Game";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/get/";

export default function Page({params}: { params: { nameID: string } }) {
  const {data, error, isLoading} = useSWR(apiURL + params.nameID, fetcher);

  if (isLoading) 
    return (
    <div className="max-w-5xl px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center">
      <p className="text-4xl">Loading...</p>
    </div>
  );
  if (error)
    return (
      <div className="max-w-5xl px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, maybe my server is down, hehe. <br/>
          Please try again later.
        </h3>
      </div>
    );
  if (!data)
    return (
      <div className="max-w-5xl px-8 mx-auto w-full text-center flex-1 flex flex-col place-content-center">
        <h1 className="text-3xl">Game not found</h1>
        <h3 className="text-xl pt-8">
          Requested game not found, it&apos;s probably deleted, error/bug in the code, or idk? 🤷‍♂️
        </h3>
      </div>
    );
  const loadedData = data as Game;
  return (
    <main className="flex flex-col max-w-5xl px-8 mx-auto w-full justify-center gap-2 text-brown-darker">
      <Link href="/home" className="text-sm">← Return to home</Link>
      <div className="flex flex-col gap-6 w-full mb-12">
        <GamePlayer game={loadedData}/>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col gap-12 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-center">
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
                            } px-2 py-1 rounded-md text-sm
                              `}
                          >
                              {loadedData.status.name}
                          </span>
                    </div>
                  </div>
                  <Heart width={32} height={32} svgClass={"text-brown-dark"} isClicked={false}/>
                </div>
                <div className="flex gap-2">
                  {loadedData.category.map((cat) => (
                    <span className="py-1 px-4 bg-brown-darker text-cream rounded-md" key={cat}>
                              {cat}
                          </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row text-sm gap-2">
                <p>Developer:</p>
                <p>Publisher:</p>
              </div>
              <h3 className="text-xl">{loadedData.description}</h3>
            </div>
            <p>Disclaimer:</p>
          </div>
          <div className="w-full max-w-[324px]">
            <RandomGameList/>
          </div>
        </div>
      </div>
    </main>
  );
}