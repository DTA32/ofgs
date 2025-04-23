"use client";

import Link from "next/link";
import Image from "next/image";
import Game from "@/interfaces/Game";
import {usePathname} from "next/navigation";

const imageLoader = ({src}: { src: string }) => {
  return process.env.NEXT_PUBLIC_STATIC_URL + `/images/${src}`;
};

interface CardProps {
  game: Game;
  isMini?: boolean;
}

export default function Card({game, isMini = false}: CardProps) {
  const width = isMini ? 150 : 240;
  const height = isMini ? 100 : 160;
  const pathname = usePathname().split("/")[1];
  const href = () => {
    if (pathname === "admin") return `/admin/games/${game.nameID}`;
    else return `/games/${game.nameID}`;
  };
  return (
    <Link href={href()} className="relative w-fit group">
      <Image
        loader={imageLoader}
        src={game.nameID + "." + game.imageType}
        className="rounded-lg m-0"
        alt={game.nameID}
        width={width}
        height={height}
        style={{width: width, height: height, objectFit: "cover"}}
      />
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(255, 255, 255, 0.00) 0%, #000 90%)",
          width: width,
        }}
      ></div>
      <p
        className={`absolute text-white bottom-2 left-2.5 font-semibold tracking-wider ${
          isMini ? "text-sm" : "text-base"
        }`}
      >
        {game.title}
      </p>
      {!isMini && (
        <div
          className="absolute z-10 bottom-0 left-0 w-full bg-brown-dark bg-opacity-90 text-cream p-2
                   rounded-b-lg translate-y-[100%] invisible group-hover:visible
                   before:absolute before:content-[''] before:-top-2 before:left-0 before:w-full before:h-2 
                   before:bg-black"
        >
          <div
            className="h-0 group-hover:h-auto overflow-hidden transition-[height] duration-500 ease-in-out"
          >
            <div
              className="text-sm max-h-0 group-hover:max-h-[200px] overflow-hidden
                 transition-[max-height] duration-500 ease-in-out"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-xs">
                  <p className="px-2 py-1 bg-orange/50 rounded-lg">{game.category[0]}</p>
                  {game.status.type !== 2 && (
                    <p className="px-2 py-1 bg-orange-dark/50 rounded-lg">{game.status.name}</p>
                  )}
                </div>
                <p className="line-clamp-4">
                  {game.description.substring(0, 250)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
