import { useEffect } from "react";

const useRuffleScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default function GamePlayer({ nameID }: { nameID: string }) {
  const src = (nameID: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/games/get/${nameID}.swf`;
  };
  useRuffleScript("/ruffle/ruffle.js");
  return (
    <div className="flex justify-center align-center w-full h-full">
      <embed src={src(nameID)} width={720} height={480} />
    </div>
  );
}
