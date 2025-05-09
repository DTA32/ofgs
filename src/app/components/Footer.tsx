import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row justify-between px-8 md:px-16 py-3 space-y-8 md:space-y-0 text-cream bottom-0 bg-brown-dark">
      <div className="flex flex-col items-center gap-1">
        <Image src="/logo.png" width={48} height={55} alt="logo"/>
        <small className="text-xs">
          Created by DTA32
        </small>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg">
          Home for all of my favorite flash games
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex justify-between gap-4 w-full md:w-auto md:grid md:grid-cols-2 md:gap-1">
          <Link href="/about">About</Link>
          <Link href="/about#privacy-policy">Privacy Policy</Link>
          <Link href="/about#disclaimer">Disclaimer</Link>
          <Link href="/about#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
