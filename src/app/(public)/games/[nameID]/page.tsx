"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiURL = process.env.NEXT_PUBLIC_API_URL + "/data/get/";

export default function Page({ params }: { params: { nameID: string } }) {
  const { data, error, isLoading } = useSWR(apiURL + params.nameID, fetcher);

  if (isLoading)
    return <div className="m-24 text-center text-4xl">Loading...</div>;
  if (error)
    return (
      <div className="m-24 text-center">
        <h1 className="text-3xl">Game not found</h1>
        <h3 className="text-xl pt-8">
          Requested game not found, it&apos;s probably unavailable, deleted,
          error/bug in the code, or idk?
        </h3>
      </div>
    );

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 my-12 px-8 md:px-32">
        <div>
          <h1 className="text-3xl mb-1.5">{data.title}</h1>
          <h4 className="text-lg mb-8">{data.category}</h4>
          <h3 className="text-xl">{data.description}</h3>
        </div>
        <div></div>
        <div className="flex md:justify-center pt-12 md:pt-0">
          <p className="text-lg">Random suggestion</p>
        </div>
      </div>
    </main>
  );
}
