"use client";
import useSWRInfinite from "swr/infinite";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/get";

export default function GameList() {
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${apiURL}?page=${index}&limit=8`;
  };
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite(getKey, fetcher);
  if (isLoading)
    return <div className="m-24 text-center text-4xl">Loading...</div>;
  if (error || !data)
    return (
      <div className="m-24 text-center">
        <h1 className="text-3xl">Error</h1>
        <h3 className="text-xl pt-8">
          Error while fetching data, please try again later.
        </h3>
      </div>
    );
  const isReachingEnd = data[data.length - 1].length < 16;

  return (
    <div>
      <div
        className={
          "inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-28 gap-y-12"
        }
      >
        {data.map((page: any) =>
          page.map((game: Game) => (
            <Card key={game.nameID} game={game} isMini={false} />
          ))
        )}
      </div>
      <div className="flex justify-center align-center text-center mt-10 mb-6 text-xl">
        {isValidating && <p>Loading...</p>}
        {!isValidating && data[size - 1].length !== 0 && (
          <button
            className="py-2 px-16 rounded-lg bg-amber-600 text-zinc-100"
            onClick={() => {
              setSize(size + 1);
            }}
          >
            Load more
          </button>
        )}
        {!isValidating && isReachingEnd && size > 1 && <p>No more games</p>}
      </div>
    </div>
  );
}
