"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderAdmin() {
  const pathname = usePathname();
  if (pathname === "/admin") return <Header />;
  return (
    <header
      style={{ backgroundColor: "#5E503F" }}
      className="flex justify-between items-center py-1.5 px-2 text-white"
    >
      <Link href="/admin/home/add">
        <button className="border px-2 rounded-lg bg-green-700 text-4xl h-1/2">
          +
        </button>
      </Link>
      <Link href="/admin/home">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
      </Link>
      <Link href="/home">
        <button className="border px-2 rounded-lg bg-red-700 text-4xl h-1/2">
          x
        </button>
      </Link>
    </header>
  );
}
