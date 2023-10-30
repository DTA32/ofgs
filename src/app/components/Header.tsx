import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="flex justify-center content-center py-1.5 bg-yellow-800">
      <Link href="/home">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
      </Link>
    </header>
  );
}
