import type { Locale } from "@/i18n/routing";
import { siteUrl, company } from "@/lib/site";
import { absoluteUrl } from "@/lib/i18n-urls";
import { type Journey, pick } from "@/lib/journeys";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: company.name,
        url: absoluteUrl(locale, "/"),
        telephone: company.phone,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.street,
          postalCode: company.postalCode,
          addressLocality: company.city,
          addressCountry: "DE",
        },
        areaServed: "Europe",
        description:
          "Founder-led boutique offering private jet roundtrips through Europe for six to eight guests.",
      }}
    />
  );
}

export function JourneyJsonLd({
  journey,
  locale,
}: {
  journey: Journey;
  locale: Locale;
}) {
  const journeyUrl = absoluteUrl(locale, {
    pathname: "/journeys/[slug]",
    params: { slug: journey.slug },
  });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: pick(journey.title, locale),
        description: pick(journey.summary, locale),
        url: journeyUrl,
        touristType: "Luxury travellers",
        itinerary: {
          "@type": "ItemList",
          itemListElement: journey.itinerary.map((d) => ({
            "@type": "ListItem",
            position: d.day,
            name: `${pick(d.title, locale)}, ${d.city}`,
          })),
        },
        provider: {
          "@type": "TravelAgency",
          name: company.name,
          url: siteUrl,
        },
        ...(journey.priceFrom
          ? {
              offers: {
                "@type": "Offer",
                price: journey.priceFrom,
                priceCurrency: "EUR",
                // Only an "open" journey is actually purchasable; the rest are
                // interest-list entries and must not claim availability.
                availability:
                  journey.status === "open"
                    ? "https://schema.org/LimitedAvailability"
                    : "https://schema.org/PreOrder",
                url: journeyUrl,
              },
            }
          : {}),
      }}
    />
  );
}

/** FAQPage markup for a journey's question list. Omitted when there are none. */
export function JourneyFaqJsonLd({
  journey,
  locale,
}: {
  journey: Journey;
  locale: Locale;
}) {
  if (journey.faq.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: journey.faq.map((item) => ({
          "@type": "Question",
          name: pick(item.question, locale),
          acceptedAnswer: {
            "@type": "Answer",
            text: pick(item.answer, locale),
          },
        })),
      }}
    />
  );
}
