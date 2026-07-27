// Teaser journeys: published pages that present the theme, region and the
// "Request a Journey" flow. The full itinerary and pricing are shared in the
// personal brochure on request, so route/itinerary/inclusions are intentionally
// omitted here (never fabricated). Fill them in the same shape as
// finest-of-europe.ts once the brochure content is available.

const guests = { en: "6–10 guests", de: "6–10 Gäste" } as const;

export const teaserJourneys = [
  {
    slug: "the-founders-edition-finest-of-europe",
    published: true,
    featured: false,
    order: 2,
    title: {
      en: "The Founders Edition: Finest of Europe",
      de: "Die Founders Edition: Das Feinste Europas",
    },
    tagline: {
      en: "The inaugural edition, for a first circle of guests.",
      de: "Die Eröffnungsedition, für einen ersten Kreis von Gästen.",
    },
    summary: {
      en: "Our founding journey across Europe's cultural capitals, composed as a special edition for those who begin the story with us. The full itinerary is shared in your personal brochure.",
      de: "Unsere Gründungs-Journey durch Europas Kulturmetropolen, als besondere Edition komponiert für jene, die die Geschichte mit uns beginnen. Der vollständige Reiseverlauf wird in Ihrer persönlichen Broschüre geteilt.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/aircraft/pc12-hangar.jpg",
      alt: {
        en: "Private aircraft in golden hangar light",
        de: "Privatflugzeug im goldenen Hangarlicht",
      },
    },
  },
  {
    slug: "secrets-of-europe",
    published: true,
    featured: false,
    order: 3,
    title: { en: "Secrets of Europe", de: "Geheimnisse Europas" },
    tagline: {
      en: "The continent's quiet corners, flown privately.",
      de: "Die stillen Ecken des Kontinents, privat geflogen.",
    },
    summary: {
      en: "Beyond the familiar capitals, a journey to Europe's lesser-seen places, hand-selected and difficult to combine by any other means. Details on request.",
      de: "Jenseits der bekannten Metropolen, eine Journey zu Europas selten gesehenen Orten, handverlesen und anders kaum zu verbinden. Details auf Anfrage.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/experiences/cultural-discovery.jpg",
      alt: { en: "Cultural discoveries", de: "Kulturelle Entdeckungen" },
    },
  },
  {
    slug: "elegant-islands",
    published: true,
    featured: false,
    order: 4,
    title: { en: "Elegant Islands", de: "Elegante Inseln" },
    tagline: {
      en: "Mediterranean islands, one private sky.",
      de: "Mediterrane Inseln, ein privater Himmel.",
    },
    summary: {
      en: "An island-to-island journey along the Mediterranean's most elegant shores, connected privately where ferries and connections would otherwise slow the way. Details on request.",
      de: "Eine Insel-zu-Insel-Journey entlang der elegantesten Küsten des Mittelmeers, privat verbunden, wo Fähren und Anschlüsse sonst den Weg verlangsamen. Details auf Anfrage.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/experiences/luxury-travel.jpeg",
      alt: {
        en: "Luxury travel by private jet",
        de: "Luxusreisen im Privatjet",
      },
    },
  },
  {
    slug: "fascinating-balkan",
    published: true,
    featured: false,
    order: 5,
    title: { en: "Fascinating Balkans", de: "Faszinierender Balkan" },
    tagline: {
      en: "The undiscovered southeast, in comfort.",
      de: "Der unentdeckte Südosten, in Komfort.",
    },
    summary: {
      en: "A journey through the Balkans' dramatic landscapes and layered cultures, regions rich in character and rarely combined. Details on request.",
      de: "Eine Journey durch die dramatischen Landschaften und vielschichtigen Kulturen des Balkans, Regionen voller Charakter und selten kombiniert. Details auf Anfrage.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/aircraft/pc12.jpg",
      alt: { en: "The Pilatus PC-12", de: "Die Pilatus PC-12" },
    },
  },
  {
    slug: "wild-scandinavia",
    published: true,
    featured: false,
    order: 6,
    title: { en: "Wild Scandinavia", de: "Wildes Skandinavien" },
    tagline: {
      en: "The raw north, privately reached.",
      de: "Der raue Norden, privat erreicht.",
    },
    summary: {
      en: "Fjords, light and northern wilderness: a journey to Scandinavia's most remote beauty, reached privately and lived in comfort. Details on request.",
      de: "Fjorde, Licht und nordische Wildnis: eine Journey zur entlegensten Schönheit Skandinaviens, privat erreicht und in Komfort erlebt. Details auf Anfrage.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/aircraft/citation-departure.jpg",
      alt: {
        en: "Business jet departing into a clear sky",
        de: "Business-Jet beim Start in klaren Himmel",
      },
    },
  },
  {
    slug: "worlds-signature-journeys",
    published: true,
    featured: false,
    order: 7,
    title: {
      en: "World's Signature Journeys",
      de: "Signature Journeys der Welt",
    },
    tagline: {
      en: "Beyond Europe, the signature journeys.",
      de: "Jenseits Europas, die Signature Journeys.",
    },
    summary: {
      en: "Our furthest-reaching journeys, composed beyond Europe for those who have travelled with us before. Shared privately, by invitation and on request.",
      de: "Unsere weitreichendsten Journeys, jenseits Europas komponiert für jene, die schon mit uns gereist sind. Privat geteilt, auf Einladung und Anfrage.",
    },
    guestsLabel: guests,
    heroImage: {
      src: "/images/aircraft/business-jet-engine.jpg",
      alt: {
        en: "Business jet engine and wing",
        de: "Triebwerk und Tragfläche eines Business-Jets",
      },
    },
  },
];
