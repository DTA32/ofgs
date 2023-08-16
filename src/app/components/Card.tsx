"use client";

import Link from "next/link";
import Image from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  return process.env.NEXT_PUBLIC_API_URL + `images/get/${src}`;
};

export default function card({ data }: any) {
  return (
    <Link href={`/games/${data.nameID}`}>
      <div className="relative w-full h-full">
        <Image
          loader={imageLoader}
          src={data.nameID}
          className="rounded-lg"
          alt={data.nameID}
          width={240}
          height={160}
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
          {data.title}
        </p>
      </div>
    </Link>
  );
}
