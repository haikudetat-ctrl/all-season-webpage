import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>This page is not on the new roof-and-energy map.</h1>
      <ButtonLink href="/">Go home</ButtonLink>
    </main>
  );
}
