"use client";
import useSWR from "swr";
import RandomGameList from "@/app/components/RandomGameList";
import GamePlayer from "@/app/components/GamePlayer";
import Game from "@/app/interfaces/Game";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/get/";

export default function Page({ params }: { params: { nameID: string } }) {
  const { data, error, isLoading } = useSWR(apiURL + params.nameID, fetcher);

  if (isLoading)
    return <div className="m-24 text-center text-4xl flex-1">Loading...</div>;
  if (error)
    return (
      <div className="m-24 text-center flex-1">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, please try again later.
        </h3>
      </div>
    );
  if (!data)
    return (
      <div className="m-24 text-center flex-1">
        <h1 className="text-3xl">Game not found</h1>
        <h3 className="text-xl pt-8">
          Requested game not found, it&apos;s probably deleted, error/bug in the
          code, or idk? 🤷‍♂️
        </h3>
      </div>
    );
  const loadedData = data as Game;
  return (
    <main className="min-h-[71vh] pb-32">
      <div className="my-6">
        <GamePlayer game={loadedData} />
      </div>
      <div className="flex flex-col justify-between md:flex-row mb-12 px-8 md:px-24">
        <div className="md:max-w-[60%]">
          <div className="flex gap-6">
            <h1 className="text-3xl mb-1.5">{loadedData.title}</h1>
            <div className="flex content-center items-center">
              <span
                className={`
                  ${
                    loadedData.status.type === 0
                      ? "bg-red-500"
                      : loadedData.status.type === 1
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  } px-2 py-0.5 rounded-md text-sm
                `}
              >
                {loadedData.status.name}
              </span>
            </div>
          </div>
          <div className="text-lg mb-8 flex gap-2">
            {loadedData.category.map((cat) => (
              <span className="py-0.5 px-3 bg-gray-300 rounded-md" key={cat}>
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-xl">{loadedData.description}</h3>
        </div>
        <div className="pt-12 md:pt-0">
          <RandomGameList />
        </div>
      </div>
    </main>
  );
}
