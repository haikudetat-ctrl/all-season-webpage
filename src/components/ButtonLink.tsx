import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "plain";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  return (
    <Link className={`button-link ${variant}`} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}
