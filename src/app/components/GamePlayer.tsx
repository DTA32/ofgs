"use client";
import Game from "../interfaces/Game";
import Script from "next/script";
import {useState} from "react";
import Link from "next/link";

export default function GamePlayer({ game }: { game: Game }) {
  const [warningDialog, setWarningDialog] = useState(game.status.type !== 2);
  let player: JSX.Element = <></>;
  if (!warningDialog) {
    player = (
      <embed
        src={`${process.env.NEXT_PUBLIC_STATIC_URL}/games/${game.nameID}.swf`}
        width={game.dimension.width}
        height={game.dimension.height}
      />
    )
  }
  else {
    player = (
      <div className={`flex flex-col text-center gap-4 justify-center items-center 
                      text-brown-darker border border-brown-dark/50`}
        style={{
          width: `${game.dimension.width}px`,
          height: `${game.dimension.height}px`,
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-2xl">Warning:</h3>
          <p className="text-xl">This game is {game.status.name.toLowerCase()}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Do you still want to try play this game?</p>
          <div className="flex gap-4">
            <button className="border border-brown-dark rounded-lg px-4 py-1"
                    onClick={() => setWarningDialog(false)}
            >
              Yes
            </button>
            <Link className="border bg-orange text-cream rounded-lg px-4 py-1" href="/home">No</Link>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Script src="https://unpkg.com/@ruffle-rs/ruffle" />
      <div className="flex justify-center align-center w-full h-full">
        {player}
      </div>
    </>
  );
}
