import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={clsx(variant === "primary" ? "button-primary" : "button-secondary", className)}>
      {children}
    </Link>
  );
}
