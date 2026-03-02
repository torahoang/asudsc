import Link from "next/link";

export default function ActionButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500"
      : "bg-rose-900 text-white hover:bg-rose-950 focus-visible:ring-rose-900";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}