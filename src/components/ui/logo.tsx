import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="text-xl leading-6 drop-shadow-lg w-40">
      <span className="text-green-500 font-bold">Money</span>
      <span className="text-orange-500 font-semibold">Lover 💖</span>
    </Link>
  );
}
