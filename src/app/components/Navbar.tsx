"use client"
import Image from "next/image";
import Magnifier from "@/app/icons/Magnifier";
import Heart from "@/app/icons/Heart";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname.includes("/home");
  return (
    <nav
      className={`flex justify-between text-brown-darker gap-4 ${isHome ? "container px-14 my-6 mx-auto w-full" : "mx-8 my-4"}`}
    >
      <div className="flex gap-4 items-center">
        <Link href="/home">
          <Image src="/logo.png" width={60} height={69} alt="logo"/>
        </Link>
        <h1 className={`${isHome ? "block" : "hidden"} text-lg md:text-3xl`}>DTA32&apos;s Flash Game Sites</h1>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        <div className="flex rounded-lg border border-brown-dark p-3 max-h-12 gap-2">
          <input type="text" className="text-brown-darker bg-cream-light w-full max-w-[196px]"
                 placeholder="Search games"/>
          <button type="submit">
            <Magnifier width={24} height={24} svgClass={"text-brown-darker"}/>
          </button>
        </div>
        <Link href="/favorite">
          <Heart width={32} height={32} svgClass={"text-brown-dark"} isClicked={true}/>
        </Link>
      </div>
      <div className="flex md:hidden gap-4 items-center">
        <button type="submit">
          <Magnifier width={24} height={24} svgClass={"text-brown-darker"}/>
        </button>
        <Link href="/favorite">
          <Heart width={32} height={32} svgClass={"text-brown-dark"} isClicked={true}/>
        </Link>
      </div>
    </nav>
  )
}