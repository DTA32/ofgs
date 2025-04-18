import Game from "../interfaces/Game";
import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "awayfl-player": any;
    }
  }
}

export default function GamePlayer({ game }: { game: Game }) {
  const src = (nameID: string) => {
    return `${process.env.NEXT_PUBLIC_STATIC_URL}/games/${nameID}.swf`;
  };
  var emulatorScript: string = "";
  var embedJSX: JSX.Element = <></>;
  if (game.type === 1) {
    emulatorScript = "/awayfl/embed.js";
    embedJSX = (
      <awayfl-player runtimebaseurl="/awayfl" src={src(game.nameID)} />
    );
  } else if (game.type === 2) {
    emulatorScript = "https://unpkg.com/@ruffle-rs/ruffle";
    embedJSX = (
      <embed
        src={src(game.nameID)}
        width={game.dimension.width}
        height={game.dimension.height}
      />
    );
  }

  return (
    <>
      <Script src={emulatorScript} />
      <div className="flex justify-center align-center w-full h-full">
        {embedJSX}
      </div>
    </>
  );
}
