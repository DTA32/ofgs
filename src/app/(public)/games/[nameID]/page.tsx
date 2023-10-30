"use client";
import useSWR from "swr";
import RandomGameList from "@/app/components/RandomGameList";
import GamePlayer from "@/app/components/GamePlayer";

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
          code, or idk?
        </h3>
      </div>
    );

  return (
    <main className="min-h-[71vh] pb-32">
      <div className="my-6">
        <GamePlayer nameID={data.nameID} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mb-12 px-8 md:px-24">
        <div className="col-span-3">
          <div className="md:max-w-[75%]">
            <h1 className="text-3xl mb-1.5">{data.title}</h1>
            <h4 className="text-lg mb-8">{data.category}</h4>
            <h3 className="text-xl">{data.description}</h3>
          </div>
        </div>
        <div className="flex flex-col pt-12 md:pt-0">
          <p className="text-lg mb-4">Random suggestion</p>
          <RandomGameList />
        </div>
      </div>
    </main>
  );
}
