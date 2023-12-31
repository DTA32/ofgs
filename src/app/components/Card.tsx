"use client";

import Link from "next/link";
import Image from "next/image";
import Game from "@/interfaces/Game";
import { usePathname } from "next/navigation";

const imageLoader = ({ src }: { src: string }) => {
  return process.env.NEXT_PUBLIC_API_URL + `/images/get/${src}`;
};

interface CardProps {
  game: Game;
  isMini?: boolean;
}

export default function Card({ game, isMini = false }: CardProps) {
  const width = isMini ? 150 : 240;
  const height = isMini ? 100 : 160;
  const pathname = usePathname().split("/")[1];
  const href = () => {
    if (pathname === "admin") return `/admin/games/${game.nameID}`;
    else return `/games/${game.nameID}`;
  };
  return (
    <Link href={href()} className="relative w-full h-full">
      <Image
        loader={imageLoader}
        src={game.nameID}
        className="rounded-lg"
        alt={game.nameID}
        width={width}
        height={height}
        style={{ width: width, height: height, objectFit: "cover" }}
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
    </Link>
  );
}
