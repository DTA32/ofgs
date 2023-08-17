"use client";

import Link from "next/link";
import Image from "next/image";
import Game from "@/interfaces/Game";

const imageLoader = ({ src }: { src: string }) => {
  return process.env.NEXT_PUBLIC_API_URL + `/images/get/${src}`;
};

interface CardProps {
  game: Game;
  width?: number;
  height?: number;
}

export default function card({ game, width = 240, height = 160 }: CardProps) {
  return (
    <Link href={`/games/${game.nameID}`}>
      <div className="relative w-full h-full">
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
          className="absolute bottom-0 h-full rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(255, 255, 255, 0.00) 0%, #000 90%)",
            width: "240px",
          }}
        ></div>
        <p className="absolute text-white bottom-2 left-2.5 font-semibold tracking-wider">
          {game.title}
        </p>
      </div>
    </Link>
  );
}
