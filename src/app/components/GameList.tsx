"use client";
import useSWRInfinite from "swr/infinite";
import Card from "@/components/Card";
import Game from "@/interfaces/Game";
import ChevronDown from "@/app/icons/ChevronDown";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/get";

export default function GameList() {
    const getKey = (index: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.length) return null;
        return `${apiURL}?page=${index}&limit=9`;
    };
    const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher);
    if (isLoading) 
      return (
        <div className="w-full h-[75vh] flex flex-col place-content-center">
          <p className="text-center text-4xl">Loading...</p>
        </div>
      );
    if (error || !data)
        return (
            <div className="w-full h-[75vh] flex flex-col text-center place-content-center">
                <h1 className="text-3xl">Error</h1>
                <h3 className="text-xl pt-8">
                    Error while fetching data, maybe my server is down, hehe. <br/>Please try again later.
                </h3>
            </div>
        );
    const isReachingEnd = data[data.length - 1].length < 16;

    return (
        <div className="flex flex-col w-full gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center gap-4 w-full">
                <button type="submit" className="text-lg px-6 py-2 text-cream bg-brown-dark rounded-lg">All</button>
                <button type="submit" className="text-lg px-6 py-2 text-brown-darker hidden md:block border border-brown-dark rounded-lg">Racing</button>
                <button type="submit" className="text-lg px-6 py-2 text-brown-darker hidden md:block border border-brown-dark rounded-lg">Platformer</button>
                <div className="flex items-center relative">
                  <select className="text-lg px-4 py-2 text-brown-darker w-36 border border-brown-dark rounded-lg appearance-none bg-cream-light">
                    <option selected={true} disabled={true}>Other</option>
                  </select>
                  <button className="flex items-center absolute right-2.5">
                    <ChevronDown width={32} height={32} svgClass="text-brown-darker"/>
                  </button>
                </div>
              </div>
              <div className="w-full inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-28">
                {data.map((page: any) =>
                  page.map((game: Game) => <Card key={game.nameID} game={game} isMini={false} />)
                )}
              </div>
            </div>
            <div className="flex justify-center align-center text-center mb-6 text-xl">
                {isValidating && <p>Loading...</p>}
                {!isValidating && data[size - 1].length !== 0 && (
                    <button
                        className="py-2 px-8 rounded-lg bg-orange text-cream"
                        onClick={() => {
                            setSize(size + 1);
                        }}
                    >
                        Load more
                    </button>
                )}
                {!isValidating && data[size - 1].length == 0 && <p>No more games</p>}
            </div>
        </div>
    );
}
