import GameList from "@/components/GameList";

export default function Home() {
  return (
    <main>
      <div id="title" className="py-3">
        <h1 className="text-center text-4xl text-white mb-1.5">Admin Page</h1>
        <h2 className="text-center text-2xl text-white">
          Choose any game to manage them
        </h2>
      </div>
      <div className="flex justify-center my-4 text-white">
        <GameList />
      </div>
    </main>
  );
}
