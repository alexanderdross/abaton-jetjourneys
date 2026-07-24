import type { ReactNode } from "react";
import { Container } from "./ui/Container";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-32 pb-24">
      <Container size="narrow">
        <h1 className="display-serif text-4xl sm:text-5xl mb-12">{title}</h1>
        <div className="prose-editorial max-w-none">{children}</div>
      </Container>
    </div>
  );
}
