// Additional journeys of the ABATON collection.
//
// NOTE: routes and day-by-day descriptions are editorial DRAFTS composed from
// each journey's theme (no prices, no named hotels). Replace them with the real
// brochure content when available, in the same shape as finest-of-europe.ts.

const guests = { en: "6–10 guests", de: "6–10 Gäste" } as const;
const munich = { en: "Munich", de: "München" } as const;
const hotels = {
  en: "4★ and 5★ luxury hotels",
  de: "4★- und 5★-Luxushotels",
} as const;

function inclusions(nights: number) {
  return {
    en: [
      "All flights by private jet, beginning and ending in Munich",
      "Luxury ground transportation with private chauffeurs at each destination",
      `${nights} nights in 4★ or 5★ luxury hotels`,
      "Daily breakfast at all accommodations",
      "Selected lunches and gourmet dinners",
      "Curated cultural experiences and private access",
      "Dedicated ABATON host throughout the journey",
    ],
    de: [
      "Alle Flüge per Privatjet, mit Start und Ziel in München",
      "Luxuriöse Bodentransporte mit privaten Chauffeuren an jedem Ziel",
      `${nights} Nächte in 4★- oder 5★-Luxushotels`,
      "Tägliches Frühstück in allen Unterkünften",
      "Ausgewählte Mittagessen und Gourmet-Abendessen",
      "Kuratierte kulturelle Erlebnisse und private Zugänge",
      "Persönliche ABATON-Begleitung während der gesamten Journey",
    ],
  };
}

type Day = {
  day: number;
  city: string;
  title: { en: string; de: string };
  description: { en: string; de: string };
};

const gallery = [
  {
    src: "/images/experiences/cultural-discovery.jpg",
    alt: { en: "Cultural discoveries", de: "Kulturelle Entdeckungen" },
  },
  {
    src: "/images/experiences/luxury-hotels.avif",
    alt: { en: "Hand-selected luxury hotels", de: "Handverlesene Luxushotels" },
  },
  {
    src: "/images/experiences/dining.jpg",
    alt: { en: "Gourmet dining", de: "Gourmet-Dining" },
  },
  {
    src: "/images/experiences/chauffeurs.jpg",
    alt: { en: "Private chauffeurs", de: "Private Chauffeure" },
  },
];

export const collectionJourneys = [
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
      en: "The inaugural grand tour, for a first circle of guests.",
      de: "Die grosse Eröffnungsreise, für einen ersten Kreis von Gästen.",
    },
    summary: {
      en: "Our founding journey across Europe's cultural capitals, extended with a Florentine interlude and composed as a special edition for those who begin the story with us.",
      de: "Unsere Gründungs-Journey durch Europas Kulturmetropolen, um ein florentinisches Zwischenspiel erweitert und als besondere Edition für jene komponiert, die die Geschichte mit uns beginnen.",
    },
    nights: 9,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Vienna", "Venice", "Florence", "Rome", "Côte d'Azur", "Paris", "Munich"],
    heroImage: {
      src: "/images/aircraft/pc12-hangar.jpg",
      alt: {
        en: "Private aircraft in golden hangar light",
        de: "Privatflugzeug im goldenen Hangarlicht",
      },
    },
    gallery,
    overview: {
      en: [
        "The Founders Edition is the fullest expression of our inaugural route: the cultural capitals of Europe, connected privately and unhurried, with an added day in Florence for the birthplace of the Renaissance.",
        "Nine nights unfold in hand-selected hotels, shaped around authentic tables and private access arranged for our small founding circle.",
      ],
      de: [
        "Die Founders Edition ist der vollste Ausdruck unserer Eröffnungsroute: Europas Kulturmetropolen, privat und ohne Eile verbunden, mit einem zusätzlichen Tag in Florenz, der Wiege der Renaissance.",
        "Neun Nächte entfalten sich in handverlesenen Hotels, geformt um authentische Tische und private Zugänge für unseren kleinen Gründungskreis.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Vienna", title: { en: "Departure & imperial Vienna", de: "Abflug & imperiales Wien" }, description: { en: "We gather in Munich and take to the sky privately, arriving in Vienna by evening.", de: "Wir versammeln uns in München, heben privat ab und erreichen Wien am Abend." } },
      { day: 2, city: "Vienna", title: { en: "Palaces & coffee houses", de: "Palais & Kaffeehäuser" }, description: { en: "A day among Vienna's palaces and legendary coffee houses, with access beyond the ordinary.", de: "Ein Tag zwischen Wiens Palais und legendären Kaffeehäusern, mit Zugängen jenseits des Gewöhnlichen." } },
      { day: 3, city: "Vienna → Venice", title: { en: "Across the Alps to Venice", de: "Über die Alpen nach Venedig" }, description: { en: "A short private flight to Venice; we arrive by water as the city reveals itself.", de: "Ein kurzer Privatflug nach Venedig; wir kommen über das Wasser an, während sich die Stadt zeigt." } },
      { day: 4, city: "Venice → Florence", title: { en: "The cradle of the Renaissance", de: "Die Wiege der Renaissance" }, description: { en: "We continue to Florence for art, artisans and a Tuscan table.", de: "Wir reisen weiter nach Florenz, zu Kunst, Handwerk und einem toskanischen Tisch." } },
      { day: 5, city: "Florence → Rome", title: { en: "The Eternal City", de: "Die Ewige Stadt" }, description: { en: "South to Rome, where antiquity and la dolce vita share the same streets.", de: "Südwärts nach Rom, wo Antike und La Dolce Vita dieselben Straßen teilen." } },
      { day: 6, city: "Rome → Côte d'Azur", title: { en: "Riviera glamour", de: "Glanz der Riviera" }, description: { en: "The jet carries us to the Côte d'Azur for sea light and long Mediterranean evenings.", de: "Der Jet bringt uns an die Côte d'Azur, zu Meereslicht und langen mediterranen Abenden." } },
      { day: 7, city: "Côte d'Azur → Paris", title: { en: "The elegance of Paris", de: "Die Eleganz von Paris" }, description: { en: "A final flight north to Paris, where elegance is a native language.", de: "Ein letzter Flug nordwärts nach Paris, wo Eleganz Muttersprache ist." } },
      { day: 8, city: "Paris", title: { en: "Paris at leisure", de: "Paris in Muße" }, description: { en: "A day without hurry to make the city your own.", de: "Ein Tag ohne Eile, um sich die Stadt zu eigen zu machen." } },
      { day: 9, city: "Paris → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich, where the journey began.", de: "Wir kehren privat nach München zurück, wo die Journey begann." } },
    ] as Day[],
    inclusions: inclusions(9),
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
      en: "Beyond the familiar capitals, a journey to Europe's lesser-seen places, from Alpine Slovenia to the tables of Emilia and the gastronomic heart of France.",
      de: "Jenseits der bekannten Metropolen, eine Journey zu Europas selten gesehenen Orten, vom alpinen Slowenien über die Tische Emilias bis zum gastronomischen Herzen Frankreichs.",
    },
    nights: 7,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Ljubljana", "Trieste", "Parma", "Lyon", "Munich"],
    heroImage: {
      src: "/images/experiences/cultural-discovery.jpg",
      alt: { en: "Cultural discoveries", de: "Kulturelle Entdeckungen" },
    },
    gallery,
    overview: {
      en: [
        "Secrets of Europe is composed for the traveller who has seen the capitals and longs for what lies between them: hand-selected places, difficult to combine by any other means.",
        "Seven nights of Alpine light, Adriatic quiet and the finest tables of northern Italy and France.",
      ],
      de: [
        "Geheimnisse Europas ist für den Reisenden komponiert, der die Metropolen gesehen hat und sich nach dem sehnt, was dazwischen liegt: handverlesene Orte, anders kaum zu verbinden.",
        "Sieben Nächte alpines Licht, adriatische Stille und die feinsten Tische Norditaliens und Frankreichs.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Ljubljana", title: { en: "Departure & hidden Ljubljana", de: "Abflug & verborgenes Ljubljana" }, description: { en: "We fly privately to Slovenia's graceful, little-seen capital.", de: "Wir fliegen privat in Sloweniens anmutige, selten gesehene Hauptstadt." } },
      { day: 2, city: "Ljubljana", title: { en: "Alpine lakes", de: "Alpine Seen" }, description: { en: "A day among emerald lakes and old-town squares.", de: "Ein Tag zwischen smaragdgrünen Seen und Altstadtplätzen." } },
      { day: 3, city: "Ljubljana → Trieste", title: { en: "The Adriatic's quiet corner", de: "Die stille Ecke der Adria" }, description: { en: "To Trieste, a crossroads of empires with a café culture all its own.", de: "Nach Triest, einem Kreuzweg der Imperien mit ganz eigener Kaffeehauskultur." } },
      { day: 4, city: "Trieste → Parma", title: { en: "Tables of Emilia", de: "Tische Emilias" }, description: { en: "Into the gastronomic heartland of Italy for its most storied producers.", de: "Ins gastronomische Kernland Italiens, zu seinen legendärsten Erzeugern." } },
      { day: 5, city: "Parma → Lyon", title: { en: "The gastronomic heart of France", de: "Das gastronomische Herz Frankreichs" }, description: { en: "A short flight to Lyon, city of bouchons and Beaujolais.", de: "Ein kurzer Flug nach Lyon, Stadt der Bouchons und des Beaujolais." } },
      { day: 6, city: "Lyon", title: { en: "Traboules & vineyards", de: "Traboules & Weinberge" }, description: { en: "Hidden passages by day, a vineyard table by evening.", de: "Verborgene Passagen am Tag, ein Weinberg-Tisch am Abend." } },
      { day: 7, city: "Lyon → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich.", de: "Wir kehren privat nach München zurück." } },
    ] as Day[],
    inclusions: inclusions(7),
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
      en: "An island-to-island journey along the Mediterranean's most elegant shores, from Mallorca's coves to Sardinia's emerald coast, Sicily and Capri, connected where ferries would slow the way.",
      de: "Eine Insel-zu-Insel-Journey entlang der elegantesten Küsten des Mittelmeers, von Mallorcas Buchten über Sardiniens Smaragdküste bis Sizilien und Capri, dort verbunden, wo Fähren den Weg verlangsamen.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Mallorca", "Sardinia", "Sicily", "Capri", "Munich"],
    heroImage: {
      src: "/images/experiences/luxury-travel.jpeg",
      alt: { en: "Luxury travel by private jet", de: "Luxusreisen im Privatjet" },
    },
    gallery,
    overview: {
      en: [
        "Elegant Islands strings together the Mediterranean's most graceful islands, each reached privately so no day is lost to connections.",
        "Eight nights of sea light, hidden coves and long island evenings.",
      ],
      de: [
        "Elegante Inseln reiht die anmutigsten Inseln des Mittelmeers aneinander, jede privat erreicht, sodass kein Tag an Anschlüsse verloren geht.",
        "Acht Nächte Meereslicht, verborgene Buchten und lange Inselabende.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Mallorca", title: { en: "Departure & Mallorca", de: "Abflug & Mallorca" }, description: { en: "We fly privately to Mallorca and its quiet northern coves.", de: "Wir fliegen privat nach Mallorca und zu seinen stillen nördlichen Buchten." } },
      { day: 2, city: "Mallorca", title: { en: "Serra de Tramuntana", de: "Serra de Tramuntana" }, description: { en: "Mountains meeting the sea, and a table above the coast.", de: "Berge, die aufs Meer treffen, und ein Tisch über der Küste." } },
      { day: 3, city: "Mallorca → Sardinia", title: { en: "The emerald coast", de: "Die Smaragdküste" }, description: { en: "To Sardinia's Costa Smeralda and its impossibly clear water.", de: "Zur Costa Smeralda Sardiniens und ihrem unfassbar klaren Wasser." } },
      { day: 4, city: "Sardinia", title: { en: "Emerald waters", de: "Smaragdgewässer" }, description: { en: "A day by private craft among coves and islets.", de: "Ein Tag mit privatem Boot zwischen Buchten und Inselchen." } },
      { day: 5, city: "Sardinia → Sicily", title: { en: "Taormina & Etna", de: "Taormina & Ätna" }, description: { en: "To Sicily, with Etna on the horizon and Taormina at its feet.", de: "Nach Sizilien, den Ätna am Horizont und Taormina zu seinen Füßen." } },
      { day: 6, city: "Sicily → Capri", title: { en: "The isle of Capri", de: "Die Insel Capri" }, description: { en: "A short flight to the Bay of Naples and timeless Capri.", de: "Ein kurzer Flug zum Golf von Neapel und dem zeitlosen Capri." } },
      { day: 7, city: "Capri", title: { en: "Grottoes & gardens", de: "Grotten & Gärten" }, description: { en: "Blue grotto by morning, cliffside gardens by evening.", de: "Blaue Grotte am Morgen, Klippengärten am Abend." } },
      { day: 8, city: "Capri → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich.", de: "Wir kehren privat nach München zurück." } },
    ] as Day[],
    inclusions: inclusions(8),
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
      en: "A journey down the Dalmatian coast and into Montenegro's dramatic bays, regions rich in character and rarely combined, reached privately and lived in comfort.",
      de: "Eine Journey entlang der dalmatinischen Küste und in Montenegros dramatische Buchten, Regionen voller Charakter und selten kombiniert, privat erreicht und in Komfort erlebt.",
    },
    nights: 7,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Split", "Dubrovnik", "Kotor", "Munich"],
    heroImage: {
      src: "/images/aircraft/pc12.jpg",
      alt: { en: "The Pilatus PC-12", de: "Die Pilatus PC-12" },
    },
    gallery,
    overview: {
      en: [
        "Fascinating Balkans follows the Adriatic's most beautiful and least-travelled coast, from Roman Split to walled Dubrovnik and the fjord-like bay of Kotor.",
        "Seven nights of stone cities, island waters and layered cultures.",
      ],
      de: [
        "Faszinierender Balkan folgt der schönsten und am wenigsten bereisten Küste der Adria, vom römischen Split über das ummauerte Dubrovnik bis zur fjordartigen Bucht von Kotor.",
        "Sieben Nächte steinerner Städte, Inselgewässer und vielschichtiger Kulturen.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Split", title: { en: "Departure & Diocletian's Split", de: "Abflug & Diokletians Split" }, description: { en: "We fly privately to Split, a living city inside a Roman palace.", de: "Wir fliegen privat nach Split, einer lebendigen Stadt in einem römischen Palast." } },
      { day: 2, city: "Split", title: { en: "The Dalmatian coast", de: "Die dalmatinische Küste" }, description: { en: "Island waters by private craft and a seaside table.", de: "Inselgewässer mit privatem Boot und ein Tisch am Meer." } },
      { day: 3, city: "Split → Dubrovnik", title: { en: "The pearl of the Adriatic", de: "Die Perle der Adria" }, description: { en: "South to Dubrovnik, its marble streets and city walls.", de: "Südwärts nach Dubrovnik, zu Marmorstraßen und Stadtmauern." } },
      { day: 4, city: "Dubrovnik", title: { en: "Walls & islands", de: "Mauern & Inseln" }, description: { en: "The old town by morning, the Elaphiti islands by afternoon.", de: "Die Altstadt am Morgen, die Elaphiti-Inseln am Nachmittag." } },
      { day: 5, city: "Dubrovnik → Kotor", title: { en: "The bay of Kotor", de: "Die Bucht von Kotor" }, description: { en: "Into Montenegro and Europe's southernmost fjord-like bay.", de: "Nach Montenegro und Europas südlichster fjordartiger Bucht." } },
      { day: 6, city: "Kotor", title: { en: "Montenegro's mountains", de: "Montenegros Berge" }, description: { en: "Peaks meeting the sea, and a quiet waterside evening.", de: "Gipfel, die aufs Meer treffen, und ein stiller Abend am Wasser." } },
      { day: 7, city: "Kotor → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich.", de: "Wir kehren privat nach München zurück." } },
    ] as Day[],
    inclusions: inclusions(7),
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
      en: "Fjords, Arctic light and northern wilderness: a journey from Bergen's fjord country to Arctic Tromsø and the Lofoten islands, closing with the elegance of Stockholm.",
      de: "Fjorde, arktisches Licht und nordische Wildnis: eine Journey von Bergens Fjordland über das arktische Tromsø und die Lofoten bis zur Eleganz Stockholms.",
    },
    nights: 7,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Bergen", "Tromsø", "Lofoten", "Stockholm", "Munich"],
    heroImage: {
      src: "/images/aircraft/citation-departure.jpg",
      alt: {
        en: "Business jet departing into a clear sky",
        de: "Business-Jet beim Start in klaren Himmel",
      },
    },
    gallery,
    overview: {
      en: [
        "Wild Scandinavia reaches the north's most remote beauty privately, where scheduled travel would demand long days of connections.",
        "Seven nights of fjords, Arctic light and, in season, the aurora, closing in graceful Stockholm.",
      ],
      de: [
        "Wildes Skandinavien erreicht die entlegenste Schönheit des Nordens privat, wo Linienreisen lange Tage voller Anschlüsse verlangen würde.",
        "Sieben Nächte Fjorde, arktisches Licht und, zur Saison, das Polarlicht, mit Abschluss im anmutigen Stockholm.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Bergen", title: { en: "Gateway to the fjords", de: "Tor zu den Fjorden" }, description: { en: "We fly privately to Bergen, the threshold of Norway's fjord country.", de: "Wir fliegen privat nach Bergen, der Schwelle zu Norwegens Fjordland." } },
      { day: 2, city: "Bergen", title: { en: "Fjord country", de: "Fjordland" }, description: { en: "A day among the fjords by private craft.", de: "Ein Tag zwischen den Fjorden mit privatem Boot." } },
      { day: 3, city: "Bergen → Tromsø", title: { en: "Into the Arctic", de: "In die Arktis" }, description: { en: "North of the Arctic Circle to Tromsø.", de: "Nördlich des Polarkreises nach Tromsø." } },
      { day: 4, city: "Tromsø", title: { en: "Light & wilderness", de: "Licht & Wildnis" }, description: { en: "Arctic wilderness by day and, in season, the northern lights.", de: "Arktische Wildnis am Tag und, zur Saison, das Nordlicht." } },
      { day: 5, city: "Tromsø → Lofoten", title: { en: "Islands of the north", de: "Inseln des Nordens" }, description: { en: "To the Lofoten, where peaks rise straight from the sea.", de: "Zu den Lofoten, wo Gipfel direkt aus dem Meer aufsteigen." } },
      { day: 6, city: "Lofoten → Stockholm", title: { en: "The elegance of Stockholm", de: "Die Eleganz Stockholms" }, description: { en: "South to Stockholm, its archipelago and old town.", de: "Südwärts nach Stockholm, zu Schärengarten und Altstadt." } },
      { day: 7, city: "Stockholm → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich.", de: "Wir kehren privat nach München zurück." } },
    ] as Day[],
    inclusions: inclusions(7),
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
      en: "Our furthest-reaching journeys, composed beyond Europe for those who have travelled with us before, from Marrakech to the pyramids, the rose city of Petra and where continents meet in Istanbul.",
      de: "Unsere weitreichendsten Journeys, jenseits Europas komponiert für jene, die schon mit uns gereist sind, von Marrakesch über die Pyramiden und die Rosenstadt Petra bis dorthin, wo in Istanbul die Kontinente aufeinandertreffen.",
    },
    nights: 9,
    guestsLabel: guests,
    departureCity: munich,
    hotelCategory: hotels,
    route: ["Munich", "Marrakech", "Cairo", "Petra", "Istanbul", "Munich"],
    heroImage: {
      src: "/images/aircraft/business-jet-engine.jpg",
      alt: {
        en: "Business jet engine and wing",
        de: "Triebwerk und Tragfläche eines Business-Jets",
      },
    },
    gallery,
    overview: {
      en: [
        "World's Signature Journeys carries the ABATON idea beyond Europe: a private-jet arc across North Africa and the Near East, reserved for our returning circle.",
        "Nine nights of ancient wonders, desert light and the meeting of continents.",
      ],
      de: [
        "Signature Journeys der Welt trägt die ABATON-Idee über Europa hinaus: ein Privatjet-Bogen über Nordafrika und den Vorderen Orient, reserviert für unseren wiederkehrenden Kreis.",
        "Neun Nächte antiker Wunder, Wüstenlicht und das Aufeinandertreffen der Kontinente.",
      ],
    },
    itinerary: [
      { day: 1, city: "Munich → Marrakech", title: { en: "Departure & the red city", de: "Abflug & die rote Stadt" }, description: { en: "We fly privately to Marrakech, its riads and souks.", de: "Wir fliegen privat nach Marrakesch, zu seinen Riads und Souks." } },
      { day: 2, city: "Marrakech", title: { en: "Souks & the Atlas", de: "Souks & der Atlas" }, description: { en: "The medina by morning, the Atlas foothills by evening.", de: "Die Medina am Morgen, die Ausläufer des Atlas am Abend." } },
      { day: 3, city: "Marrakech → Cairo", title: { en: "The pyramids of Giza", de: "Die Pyramiden von Gizeh" }, description: { en: "East to Cairo and the last of the ancient wonders.", de: "Ostwärts nach Kairo und dem letzten der antiken Weltwunder." } },
      { day: 4, city: "Cairo", title: { en: "Ancient wonders", de: "Antike Wunder" }, description: { en: "Private access to treasures of the pharaohs.", de: "Privater Zugang zu den Schätzen der Pharaonen." } },
      { day: 5, city: "Cairo → Petra", title: { en: "The rose city", de: "Die Rosenstadt" }, description: { en: "To Jordan and the carved canyons of Petra.", de: "Nach Jordanien und den gemeißelten Schluchten von Petra." } },
      { day: 6, city: "Petra", title: { en: "Among the ruins", de: "Zwischen den Ruinen" }, description: { en: "A full day in one of the world's great wonders.", de: "Ein ganzer Tag in einem der großen Weltwunder." } },
      { day: 7, city: "Petra → Istanbul", title: { en: "Where continents meet", de: "Wo Kontinente sich treffen" }, description: { en: "North to Istanbul, astride Europe and Asia.", de: "Nordwärts nach Istanbul, zwischen Europa und Asien." } },
      { day: 8, city: "Istanbul", title: { en: "Bosphorus & bazaars", de: "Bosporus & Basare" }, description: { en: "Palaces and the water by day, a Bosphorus table by night.", de: "Paläste und das Wasser am Tag, ein Tisch am Bosporus am Abend." } },
      { day: 9, city: "Istanbul → Munich", title: { en: "Homeward", de: "Heimwärts" }, description: { en: "We return privately to Munich.", de: "Wir kehren privat nach München zurück." } },
    ] as Day[],
    inclusions: inclusions(9),
  },
];
