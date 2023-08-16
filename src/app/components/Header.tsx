import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header
      style={{ backgroundColor: "#5E503F" }}
      className="flex justify-center content-center py-1.5"
    >
      <Link href="/home">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
      </Link>
    </header>
  );
}
