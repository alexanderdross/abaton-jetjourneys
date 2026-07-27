import type { ReactNode } from "react";
import { Container } from "./ui/Container";

export function LegalLayout({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="pt-32 pb-24">
      <Container size="narrow">
        {breadcrumbs ? <div className="mb-10">{breadcrumbs}</div> : null}
        <h1 className="display-serif text-4xl sm:text-5xl mb-12">{title}</h1>
        <div className="prose-editorial max-w-none">{children}</div>
      </Container>
    </div>
  );
}
