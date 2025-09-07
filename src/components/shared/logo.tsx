import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="#home" passHref>
      <span className="font-headline text-2xl font-bold text-neon cursor-pointer">
        M<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
