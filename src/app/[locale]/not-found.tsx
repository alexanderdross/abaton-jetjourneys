import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const nav = useTranslations("Nav");
  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center py-32">
      <p className="font-serif text-champagne text-7xl">404</p>
      <h1 className="display-serif mt-6 text-4xl">{t("title")}</h1>
      <p className="mt-4 text-slate">{t("body")}</p>
      <div className="mt-10">
        <LinkButton href="/" title={nav("homeTitle")}>
          {t("cta")}
        </LinkButton>
      </div>
    </Container>
  );
}
