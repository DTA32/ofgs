"use client";
import useSWR from "swr";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/getRandom";

export default function GameList() {
  const { data, error, isLoading, isValidating } = useSWR(apiURL, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  });
  if (isLoading || isValidating)
    return <div className="md:text-center pt-4 text-lg">Loading...</div>;
  if (error || !data)
    return (
      <div className="m-6 text-center">
        <h3 className="text-lg pt-4">
          Error while fetching data, please try again later.
        </h3>
      </div>
    );

  return (
    <div>
      <div className={"inline-grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8"}>
        {data.map((game: Game) => (
          <Card key={game.nameID} game={game} isMini={true} />
        ))}
      </div>
    </div>
  );
}
