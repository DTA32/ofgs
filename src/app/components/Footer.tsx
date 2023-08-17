import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#22333B", bottom: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 px-16 py-3 text-white md:justify-items-center"
    >
      <div>
        <Image src="/logo.png" width={128} height={128} alt="logo" />
        <small className="ps-2">Created by DTA32</small>
        {/*wkwkwk males nge-centerin */}
      </div>
      <div>
        <h3 className="text-2xl">DTA32&apos;s Flash Game Sites</h3>
        <p className="pt-2.5">Longer subtitle</p>
      </div>
      <div>
        <p className="text-xl pt-1">Links</p>
        <div className="pt-3">
          <Link href="/home">About</Link>
          <br />
          <Link href="/home">Contact me</Link>
        </div>
      </div>
    </footer>
  );
}
