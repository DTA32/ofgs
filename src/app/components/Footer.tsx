import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-around px-6 md:px-16 py-6 md:py-3 space-y-8 md:space-y-0 text-white bottom-0 bg-yellow-950">
      <div className="flex flex-col">
        <Image src="/logo.png" width={128} height={128} alt="logo" />
        <small className="hidden md:flex md:self-center">
          Created by DTA32
        </small>
      </div>
      <div>
        <h3 className="text-2xl">DTA32&apos;s Flash Game Site</h3>
        <p className="pt-2.5">
          Home for all of my favorite flash games, and maybe yours too!
        </p>
      </div>
      <div>
        <p className="text-xl">Links</p>
        <div className="pt-3 flex flex-col">
          <Link href="/about">About</Link>
          <Link href="/about">Contact me</Link>
        </div>
      </div>
    </footer>
  );
}
