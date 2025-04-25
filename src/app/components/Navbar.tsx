"use client"
import Image from "next/image";
import Magnifier from "@/app/icons/Magnifier";
import Heart from "@/app/icons/Heart";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Navbar() {
  const searchParams = useSearchParams();
  const category: string | null = searchParams.get("category");
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [expandedSearch, setExpandedSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(windowWidth < 768);
  const pathname = usePathname();
  const isHome = pathname.includes("/home");
  const router = useRouter();
  const handleSearch = () => {
    const categoryQuery = category ? `&category=${category}` : "";
    if (isMobile) {
      if (!expandedSearch) {
        setExpandedSearch(true);
      } else if (!isHome) {
        setExpandedSearch(false);
        router.push(`/home?search=${searchQuery}${categoryQuery}`);
      } else {
        router.push(`/home?search=${searchQuery}${categoryQuery}`);
      }
    } else {
      router.push(`/home?search=${searchQuery}${categoryQuery}`);
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  useEffect(() => {
    if (windowWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);
  return (
    <nav
      className={`flex justify-between text-brown-darker gap-4 ${isHome ? "container px-14 my-6 mx-auto w-full" : "mx-8 my-4"}`}
    >
      <div className="flex gap-4 items-center">
        <Link href="/home">
          <Image src="/logo.png" width={60} height={69} alt="logo"/>
        </Link>
        <h1 className={`${isHome && !expandedSearch ? "block" : "hidden"} text-lg md:text-3xl`}>DTA32&apos;s Flash Game
          Sites</h1>
      </div>
      <div className="flex gap-6 items-center">
        <div
          className={`flex ${!isMobile || expandedSearch ? "rounded-lg border border-brown-dark p-3" : ""} flex-row-reverse max-h-12 gap-2`}>
          <button onClick={handleSearch} type="submit">
            <Magnifier width={24} height={24} svgClass={"text-brown-darker"}/>
          </button>
          <input type="text"
                 className={`${isMobile && !expandedSearch ? "w-0" : "w-full"} text-brown-darker placeholder:text-brown-darker/75
                            bg-cream-light max-w-[196px] transition-[width] duration-500 ease-in-out`}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search games"
                 onKeyUp={(e) => {
                   if (e.key === "Enter") handleSearch();
                 }}
          />
        </div>
        <Link href="/favorite">
          <Heart width={32} height={32} svgClass={"text-brown-dark"} isClicked={true}/>
        </Link>
      </div>
    </nav>
  )
}