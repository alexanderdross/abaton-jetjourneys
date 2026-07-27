// Journey: The Premiere Edition, Finest of Europe
// Content-as-code. Add a new file like this and register it in ./index.ts.

const journey = {
  slug: "the-premiere-edition-finest-of-europe",
  published: true,
  featured: true,
  order: 1,

  title: {
    en: "The Premiere Edition: Finest of Europe",
    de: "Die Premiere Edition: Das Feinste Europas",
  },
  tagline: {
    en: "Five cultural capitals, one private sky.",
    de: "Fünf Kulturmetropolen, ein privater Himmel.",
  },
  summary: {
    en: "Our inaugural route brings together Europe's cultural capitals, from Vienna's imperial tradition to the canals of Venice, the timeless allure of Rome, the glamour of the Côte d'Azur and the elegance of Paris.",
    de: "Unsere Eröffnungsroute vereint Europas Kulturmetropolen, von Wiens imperialer Tradition über die Kanäle Venedigs und den zeitlosen Reiz Roms bis zum Glanz der Côte d'Azur und der Eleganz von Paris.",
  },

  nights: 8,
  guestsLabel: { en: "6–10 guests", de: "6–10 Gäste" },
  departureCity: { en: "Munich", de: "München" },
  hotelCategory: {
    en: "4★ and 5★ luxury hotels",
    de: "4★- und 5★-Luxushotels",
  },

  route: ["Munich", "Vienna", "Venice", "Rome", "Côte d'Azur", "Paris", "Munich"],

  heroImage: {
    src: "/images/journeys/premiere-hero.jpg",
    alt: {
      en: "Private jet on a runway at golden hour",
      de: "Privatjet auf dem Rollfeld im goldenen Licht",
    },
  },
  gallery: [
    {
      src: "/images/experiences/cultural-discovery.jpg",
      alt: { en: "Cultural discoveries", de: "Kulturelle Entdeckungen" },
    },
    {
      src: "/images/experiences/luxury-hotels.avif",
      alt: {
        en: "Hand-selected luxury hotels",
        de: "Handverlesene Luxushotels",
      },
    },
    {
      src: "/images/experiences/dining.jpg",
      alt: { en: "Gourmet dining", de: "Gourmet-Dining" },
    },
    {
      src: "/images/experiences/chauffeurs.jpg",
      alt: { en: "Private chauffeurs", de: "Private Chauffeure" },
    },
    {
      src: "/images/experiences/luxury-travel.jpeg",
      alt: {
        en: "Luxury travel by private jet",
        de: "Luxusreisen im Privatjet",
      },
    },
  ],

  overview: {
    en: [
      "The Premiere Edition is composed as a single, uninterrupted movement across the continent. Beginning and ending in Munich, every leg is flown privately, so the distance between one remarkable place and the next is measured in comfort, not compromise.",
      "Eight nights unfold in hand-selected, mostly owner-led hotels. Days are shaped around authentic tables, private access and cultural moments arranged especially for our small circle of guests.",
    ],
    de: [
      "Die Premiere Edition ist als ein einziger, ununterbrochener Bogen über den Kontinent komponiert. Mit Start und Ziel in München wird jede Etappe privat geflogen, so bemisst sich die Distanz zwischen einem besonderen Ort und dem nächsten in Komfort, nicht in Kompromissen.",
      "Acht Nächte entfalten sich in handverlesenen, meist inhabergeführten Hotels. Die Tage folgen authentischen Tischen, privaten Zugängen und kulturellen Momenten, die eigens für unseren kleinen Kreis arrangiert werden.",
    ],
  },

  itinerary: [
    {
      day: 1,
      city: "Munich → Vienna",
      title: { en: "Departure & Imperial Vienna", de: "Abflug & imperiales Wien" },
      description: {
        en: "We gather in Munich and take to the sky privately. By evening we are in Vienna, settling into the rhythm of the imperial city.",
        de: "Wir versammeln uns in München und heben privat ab. Am Abend sind wir in Wien und finden in den Rhythmus der imperialen Stadt.",
      },
    },
    {
      day: 2,
      city: "Vienna",
      title: { en: "Palaces & Coffee Houses", de: "Palais & Kaffeehäuser" },
      description: {
        en: "A day among Vienna's palaces and legendary coffee houses, with access arranged beyond the ordinary visitor's reach.",
        de: "Ein Tag zwischen Wiens Palais und legendären Kaffeehäusern, mit Zugängen jenseits des gewöhnlichen Besuchs.",
      },
    },
    {
      day: 3,
      city: "Vienna → Venice",
      title: { en: "Across the Alps to Venice", de: "Über die Alpen nach Venedig" },
      description: {
        en: "A short private flight carries us to Venice. We arrive by water to a city that reveals itself slowly, and best, to the few.",
        de: "Ein kurzer Privatflug bringt uns nach Venedig. Wir kommen über das Wasser an, in eine Stadt, die sich langsam und am schönsten den Wenigen zeigt.",
      },
    },
    {
      day: 4,
      city: "Venice",
      title: { en: "Canals & Quiet Corners", de: "Kanäle & stille Ecken" },
      description: {
        en: "Beyond the crowds: private craft, hidden palazzi and a table known only to those who belong.",
        de: "Jenseits der Menge: private Boote, verborgene Palazzi und ein Tisch, den nur die Eingeweihten kennen.",
      },
    },
    {
      day: 5,
      city: "Venice → Rome",
      title: { en: "The Eternal City", de: "Die Ewige Stadt" },
      description: {
        en: "We fly south to Rome, where antiquity and la dolce vita share the same streets. An evening of timeless allure.",
        de: "Wir fliegen südwärts nach Rom, wo Antike und La Dolce Vita dieselben Straßen teilen. Ein Abend von zeitlosem Reiz.",
      },
    },
    {
      day: 6,
      city: "Rome → Côte d'Azur",
      title: { en: "Riviera Glamour", de: "Glanz der Riviera" },
      description: {
        en: "The private jet delivers us to the Côte d'Azur. Sea light, effortless glamour and long Mediterranean evenings.",
        de: "Der Privatjet bringt uns an die Côte d'Azur. Meereslicht, müheloser Glanz und lange mediterrane Abende.",
      },
    },
    {
      day: 7,
      city: "Côte d'Azur → Paris",
      title: { en: "The Elegance of Paris", de: "Die Eleganz von Paris" },
      description: {
        en: "A final flight north to Paris. We close the journey where elegance is a native language, with a dinner to remember.",
        de: "Ein letzter Flug nordwärts nach Paris. Wir beschließen die Journey dort, wo Eleganz Muttersprache ist, mit einem Dinner, das bleibt.",
      },
    },
    {
      day: 8,
      city: "Paris",
      title: { en: "Paris at Leisure", de: "Paris in Muße" },
      description: {
        en: "A day without hurry to make the city your own, before our final evening together.",
        de: "Ein Tag ohne Eile, um sich die Stadt zu eigen zu machen, vor unserem letzten gemeinsamen Abend.",
      },
    },
    {
      day: 9,
      city: "Paris → Munich",
      title: { en: "Homeward", de: "Heimwärts" },
      description: {
        en: "We return privately to Munich, where the journey began, richer for having seen Europe as it was meant to be seen.",
        de: "Wir kehren privat nach München zurück, wo die Journey begann, reicher, weil wir Europa so gesehen haben, wie es gesehen werden sollte.",
      },
    },
  ],

  inclusions: {
    en: [
      "All flights by private jet, beginning and ending in Munich",
      "Luxury ground transportation with private chauffeurs at each destination",
      "8 nights in 4★ or 5★ luxury hotels",
      "Daily breakfast at all accommodations",
      "7 lunches or gourmet lunch boxes",
      "8 gourmet dinners",
      "Curated cultural experiences and private access",
      "Dedicated ABATON host throughout the journey",
    ],
    de: [
      "Alle Flüge per Privatjet, mit Start und Ziel in München",
      "Luxuriöse Bodentransporte mit privaten Chauffeuren an jedem Ziel",
      "8 Nächte in 4★- oder 5★-Luxushotels",
      "Tägliches Frühstück in allen Unterkünften",
      "7 Mittagessen oder Gourmet-Lunchpakete",
      "8 Gourmet-Abendessen",
      "Kuratierte kulturelle Erlebnisse und private Zugänge",
      "Persönliche ABATON-Begleitung während der gesamten Journey",
    ],
  },
} as const;

export default journey;
