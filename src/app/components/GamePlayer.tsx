import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "awayfl-player": any;
    }
  }
}

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [url]);
};

export default function GamePlayer({ nameID }: { nameID: string }) {
  const src = (nameID: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/games/get/${nameID}.swf`;
  };
  useScript("/ruffle/ruffle.js");
  return (
    <div className="flex justify-center align-center w-full h-full">
      <embed src={src(nameID)} />
      {/* <awayfl-player runtimebaseurl="/awayfl" src={src(nameID)} /> */}
    </div>
  );
}
