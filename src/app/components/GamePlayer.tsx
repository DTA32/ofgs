import Game from "../interfaces/Game";
import Script from "next/script";

export default function GamePlayer({ game }: { game: Game }) {
  
  return (
    <>
      <Script src="https://unpkg.com/@ruffle-rs/ruffle" />
      <div className="flex justify-center align-center w-full h-full">
        <embed
          src={`${process.env.NEXT_PUBLIC_STATIC_URL}/games/${game.nameID}.swf`}
          width={game.dimension.width}
          height={game.dimension.height}
        />
      </div>
    </>
  );
}
