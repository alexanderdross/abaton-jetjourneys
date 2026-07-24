import type { ReactNode } from "react";

// The locale <html> wrapper lives in app/[locale]/layout.tsx.
// This root layout only passes children through so next-intl can set <html lang>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
