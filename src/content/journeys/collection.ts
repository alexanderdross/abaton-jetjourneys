// Additional journeys of the ABATON collection.
//
// Content reflects the ABATON 2026 brochure: real routes, included services,
// "from" pricing and scheduled departures. The full itinerary and final detail
// are shared in the personal brochure on request.

const guests = { en: "6–10 guests", de: "6–10 Gäste" } as const;
const hotels = {
  en: "4★ and 5★ luxury hotels",
  de: "4★- und 5★-Luxushotels",
} as const;

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
    slug: "secrets-of-europe",
    published: true,
    featured: false,
    order: 2,
    title: { en: "Secrets of Europe", de: "Geheimnisse Europas" },
    tagline: {
      en: "Europe's quieter icons, shaped by taste.",
      de: "Europas stille Ikonen, geformt vom Geschmack.",
    },
    summary: {
      en: "A journey through Europe's quieter icons, shaped by taste, tradition and elegance. From Lake Como and San Sebastián to Porto, Provence, Florence and Salzburg, each stop reveals culture through cuisine, atmosphere and local character.",
      de: "Eine Journey durch Europas stillere Ikonen, geformt von Geschmack, Tradition und Eleganz. Vom Comer See über San Sebastián bis Porto, die Provence, Florenz und Salzburg enthüllt jede Station Kultur durch Küche, Atmosphäre und lokalen Charakter.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "Zürich", de: "Zürich" },
    hotelCategory: hotels,
    priceFrom: 30980,
    priceFromSingle: 35980,
    nextDeparture: { en: "11–19 June 2027", de: "11.–19. Juni 2027" },
    route: [
      "Zürich",
      "Lake Como",
      "San Sebastián",
      "Porto",
      "Provence",
      "Florence",
      "Salzburg",
    ],
    heroImage: {
      src: "/images/experiences/cultural-discovery.jpg",
      alt: { en: "Cultural discoveries", de: "Kulturelle Entdeckungen" },
    },
    gallery,
    overview: {
      en: [
        "Secrets of Europe reveals grace in understatement and luxury in simplicity. It begins in Zurich, where alpine elegance meets lake serenity, wandering the Old Town's hidden courtyards before the journey ahead.",
        "From the shores of Lake Como to the coast of San Sebastián, the vineyards of Porto, the lavender of Provence, the Renaissance of Florence and a baroque farewell in Salzburg, each stop is reached privately and lived unhurried.",
      ],
      de: [
        "Geheimnisse Europas offenbart Anmut im Understatement und Luxus in der Einfachheit. Es beginnt in Zürich, wo alpine Eleganz auf die Ruhe des Sees trifft, mit einem Streifzug durch die verborgenen Höfe der Altstadt vor der bevorstehenden Journey.",
        "Von den Ufern des Comer Sees über die Küste San Sebastiáns, die Weinberge von Porto, den Lavendel der Provence und die Renaissance von Florenz bis zum barocken Abschied in Salzburg wird jede Station privat erreicht und ohne Eile erlebt.",
      ],
    },
    itinerary: [
      {
        day: 1,
        city: "Zürich",
        title: { en: "Alpine Welcome", de: "Alpines Willkommen" },
        description: {
          en: "We begin in Zurich, where alpine elegance meets lake serenity, wandering the Old Town's hidden courtyards and toasting the journey ahead.",
          de: "Wir beginnen in Zürich, wo alpine Eleganz auf die Ruhe des Sees trifft, streifen durch die verborgenen Höfe der Altstadt und stoßen auf die kommende Journey an.",
        },
      },
      {
        day: 2,
        city: "Zürich → Lake Como",
        title: { en: "Lakes & Villas", de: "Seen & Villen" },
        description: {
          en: "We fly south and meander along the storied shores of Lake Como, with a visit to a secluded villa and lunch by the water.",
          de: "Wir fliegen südwärts und ziehen entlang der berühmten Ufer des Comer Sees, mit dem Besuch einer abgeschiedenen Villa und einem Mittagessen am Wasser.",
        },
      },
      {
        day: 3,
        city: "Lake Como → San Sebastián",
        title: { en: "Coast & Gastronomy", de: "Küste & Gastronomie" },
        description: {
          en: "San Sebastián welcomes us with its relaxed coastal rhythm and world-renowned gastronomy, where pintxos and sea air create their own kind of poetry.",
          de: "San Sebastián empfängt uns mit entspanntem Küstenrhythmus und weltbekannter Gastronomie, wo Pintxos und Meeresluft ihre eigene Poesie schaffen.",
        },
      },
      {
        day: 4,
        city: "San Sebastián → Porto",
        title: { en: "Douro & Vineyards", de: "Douro & Weinberge" },
        description: {
          en: "In Porto we glide down the Douro past vineyard-covered hills before a countryside tasting deep in wine country.",
          de: "In Porto gleiten wir den Douro hinab, vorbei an weinbedeckten Hügeln, vor einer Verkostung tief im Weinland.",
        },
      },
      {
        day: 5,
        city: "Porto → Provence",
        title: { en: "Lavender & Light", de: "Lavendel & Licht" },
        description: {
          en: "Provence follows, bathed in lavender and light, where hilltop villages and golden evenings stir the senses, with a dinner among olive groves.",
          de: "Es folgt die Provence, gebadet in Lavendel und Licht, wo Bergdörfer und goldene Abende die Sinne wecken, mit einem Dinner zwischen Olivenhainen.",
        },
      },
      {
        day: 6,
        city: "Provence → Florence",
        title: { en: "Renaissance Bloom", de: "Renaissance in voller Blüte" },
        description: {
          en: "Florence arrives in full Renaissance bloom, with private access to artistic treasures and intimate encounters with local artisans.",
          de: "Florenz erscheint in voller Renaissance-Blüte, mit privatem Zugang zu Kunstschätzen und persönlichen Begegnungen mit lokalen Handwerkern.",
        },
      },
      {
        day: 7,
        city: "Florence",
        title: { en: "Art & Artisans", de: "Kunst & Handwerk" },
        description: {
          en: "A day for the Uffizi and the workshops where past and present connect in rich detail.",
          de: "Ein Tag für die Uffizien und die Werkstätten, in denen sich Vergangenheit und Gegenwart in reichem Detail verbinden.",
        },
      },
      {
        day: 8,
        city: "Florence → Salzburg",
        title: { en: "Baroque Farewell", de: "Barocker Abschied" },
        description: {
          en: "Salzburg offers a baroque farewell, Mozart melodies in grand halls and a candlelit dinner to close this graceful exploration of Europe's hidden elegance.",
          de: "Salzburg schenkt einen barocken Abschied, Mozart-Melodien in prächtigen Sälen und ein Dinner bei Kerzenschein, das diese anmutige Erkundung von Europas verborgener Eleganz beschließt.",
        },
      },
      {
        day: 9,
        city: "Salzburg → Homeward",
        title: { en: "Homeward", de: "Heimwärts" },
        description: {
          en: "We take our leave after a final Alpine morning.",
          de: "Wir verabschieden uns nach einem letzten alpinen Morgen.",
        },
      },
    ] as Day[],
    inclusions: {
      en: [
        "Private jet travel throughout",
        "Luxury ground transport",
        "8 nights in 4★/5★ hotels with breakfast",
        "7 lunches and 8 dinners",
        "Scenic boat drive on Lake Como",
        "Pintxos tasting in San Sebastián",
        "Douro River cruise in Porto",
        "Wine estate visit in Porto",
        "Lavender fields tour in Provence (season permitting)",
        "Uffizi Gallery tour in Florence",
        "Classical concert in Salzburg",
      ],
      de: [
        "Privatjet-Flüge während der gesamten Journey",
        "Luxuriöse Bodentransporte",
        "8 Nächte in 4★-/5★-Hotels mit Frühstück",
        "7 Mittagessen und 8 Abendessen",
        "Panorama-Bootsfahrt auf dem Comer See",
        "Pintxos-Verkostung in San Sebastián",
        "Douro-Flusskreuzfahrt in Porto",
        "Besuch eines Weinguts in Porto",
        "Lavendelfeld-Tour in der Provence (je nach Saison)",
        "Führung durch die Uffizien in Florenz",
        "Klassisches Konzert in Salzburg",
      ],
    },
  },

  {
    slug: "elegant-islands",
    published: true,
    featured: false,
    order: 3,
    title: { en: "Elegant Islands", de: "Elegante Inseln" },
    tagline: {
      en: "The British Isles, from castles to Highlands.",
      de: "Die Britischen Inseln, von Schlössern bis ins Hochland.",
    },
    summary: {
      en: "A private jet journey through the British Isles, from London to Ireland and Scotland. From Galway to the Highlands, expect dramatic nature, rich heritage and signature moments like castle life, whisky culture and understated hospitality.",
      de: "Eine Privatjet-Journey durch die Britischen Inseln, von London über Irland bis Schottland. Von Galway bis ins Hochland erwarten Sie dramatische Natur, reiches Erbe und besondere Momente wie Schlossleben, Whiskykultur und zurückhaltende Gastfreundschaft.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "London", de: "London" },
    hotelCategory: hotels,
    priceFrom: 30220,
    priceFromSingle: 34420,
    nextDeparture: { en: "13–21 August 2027", de: "13.–21. August 2027" },
    route: [
      "London",
      "Killarney",
      "Galway",
      "Dublin",
      "Inverness",
      "Edinburgh",
    ],
    heroImage: {
      src: "/images/experiences/luxury-travel.jpeg",
      alt: {
        en: "Luxury travel by private jet",
        de: "Luxusreisen im Privatjet",
      },
    },
    gallery,
    overview: {
      en: [
        "Elegant Islands crosses seas and centuries along a curated path through the timeless elegance of the UK and Ireland, blending old-world charm with modern luxury.",
        "From grand castles to candlelit dinners, iconic culture to hidden corners, it is a voyage for the discerning traveller with a love for heritage, refinement and quiet wonder.",
      ],
      de: [
        "Elegante Inseln durchquert Meere und Jahrhunderte auf einem kuratierten Weg durch die zeitlose Eleganz Großbritanniens und Irlands und verbindet den Charme der alten Welt mit modernem Luxus.",
        "Von prächtigen Schlössern bis zu Dinners bei Kerzenschein, von ikonischer Kultur bis zu verborgenen Ecken ist es eine Reise für den anspruchsvollen Reisenden mit einer Liebe zu Erbe, Verfeinerung und stiller Verwunderung.",
      ],
    },
    itinerary: [
      {
        day: 1,
        city: "London",
        title: {
          en: "Arrival & Private Dinner",
          de: "Ankunft & privates Dinner",
        },
        description: {
          en: "We begin in London with a private dinner to start the journey.",
          de: "Wir beginnen in London mit einem privaten Dinner zum Auftakt der Journey.",
        },
      },
      {
        day: 2,
        city: "London → Killarney",
        title: { en: "Lakes of Killarney", de: "Seen von Killarney" },
        description: {
          en: "We fly west to Killarney, where a private carriage ride leads through the lakes, mountains and forests of Killarney National Park, closing with authentic Irish cuisine and a refined lakeside overnight.",
          de: "Wir fliegen westwärts nach Killarney, wo eine private Kutschfahrt durch die Seen, Berge und Wälder des Killarney-Nationalparks führt, mit authentischer irischer Küche und einer eleganten Übernachtung am See zum Abschluss.",
        },
      },
      {
        day: 3,
        city: "Killarney → Galway",
        title: { en: "Manor & Myth", de: "Herrenhaus & Mythos" },
        description: {
          en: "We arrive in the Galway region and settle into a historic castle estate for two nights, with traditional pursuits such as horseback riding, falconry or clay shooting.",
          de: "Wir erreichen die Region Galway und lassen uns für zwei Nächte auf einem historischen Schlossgut nieder, mit traditionellen Aktivitäten wie Reiten, Falknerei oder Tontaubenschießen.",
        },
      },
      {
        day: 4,
        city: "Galway",
        title: { en: "Country Traditions", de: "Ländliche Traditionen" },
        description: {
          en: "A day of refined dining and quiet estate life in the west of Ireland.",
          de: "Ein Tag mit feinem Dining und stillem Gutsleben im Westen Irlands.",
        },
      },
      {
        day: 5,
        city: "Galway → Dublin",
        title: { en: "The Capital", de: "Die Hauptstadt" },
        description: {
          en: "The journey continues to Dublin for one night, including a guided city exploration and an elegant dinner in the capital.",
          de: "Die Journey führt weiter nach Dublin für eine Nacht, mit einer geführten Stadterkundung und einem eleganten Dinner in der Hauptstadt.",
        },
      },
      {
        day: 6,
        city: "Dublin → Inverness",
        title: { en: "Into the Highlands", de: "Ins Hochland" },
        description: {
          en: "We fly to Inverness for two nights, exploring the Scottish Highlands off-road and enjoying a private boat experience on Loch Ness.",
          de: "Wir fliegen nach Inverness für zwei Nächte, erkunden die schottischen Highlands abseits der Straße und genießen ein privates Bootserlebnis auf Loch Ness.",
        },
      },
      {
        day: 7,
        city: "Inverness",
        title: { en: "Highland Pursuits", de: "Vergnügen im Hochland" },
        description: {
          en: "A visit to a local whisky distillery, followed by a traditional Highland dinner.",
          de: "Ein Besuch in einer lokalen Whisky-Destillerie, gefolgt von einem traditionellen Highland-Dinner.",
        },
      },
      {
        day: 8,
        city: "Inverness → Edinburgh",
        title: { en: "Highland Farewell", de: "Abschied im Hochland" },
        description: {
          en: "The journey ends in Edinburgh with an exclusive whisky masterclass and a farewell dinner in a historic setting overlooking the city.",
          de: "Die Journey endet in Edinburgh mit einer exklusiven Whisky-Masterclass und einem Abschiedsdinner in historischem Rahmen mit Blick über die Stadt.",
        },
      },
      {
        day: 9,
        city: "Edinburgh → Homeward",
        title: { en: "Homeward", de: "Heimwärts" },
        description: {
          en: "We take our leave after a final Scottish morning.",
          de: "Wir verabschieden uns nach einem letzten schottischen Morgen.",
        },
      },
    ] as Day[],
    inclusions: {
      en: [
        "Private jet travel throughout",
        "Luxury ground transport",
        "8 nights in 4★/5★ hotels with breakfast",
        "7 lunches and 7 dinners",
        "Carriage ride in Killarney National Park",
        "Country traditions in the Galway region",
        "Private Dublin city tour",
        "Off-road Highland experience",
        "Private boat tour on Loch Ness",
        "Whisky tasting in the Scottish Highlands",
        "Guided visit of Edinburgh Castle",
      ],
      de: [
        "Privatjet-Flüge während der gesamten Journey",
        "Luxuriöse Bodentransporte",
        "8 Nächte in 4★-/5★-Hotels mit Frühstück",
        "7 Mittagessen und 7 Abendessen",
        "Kutschfahrt im Killarney-Nationalpark",
        "Ländliche Traditionen in der Region Galway",
        "Private Stadttour in Dublin",
        "Offroad-Erlebnis im Hochland",
        "Private Bootstour auf Loch Ness",
        "Whisky-Verkostung in den schottischen Highlands",
        "Geführter Besuch von Edinburgh Castle",
      ],
    },
  },

  {
    slug: "fascinating-balkan",
    published: true,
    featured: false,
    order: 4,
    title: { en: "Fascinating Balkan", de: "Faszinierender Balkan" },
    tagline: {
      en: "High-contrast Balkans, raw and refined.",
      de: "Kontrastreicher Balkan, roh und raffiniert.",
    },
    summary: {
      en: "A high-contrast journey through the Balkans, shaped by old cultures, history and coastal beauty. From historic cities to the Bay of Kotor, tradition meets a new kind of elegance. Raw, authentic and surprisingly refined.",
      de: "Eine kontrastreiche Journey durch den Balkan, geprägt von alten Kulturen, Geschichte und Küstenschönheit. Von historischen Städten bis zur Bucht von Kotor trifft Tradition auf eine neue Art von Eleganz. Roh, authentisch und überraschend raffiniert.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "Budapest", de: "Budapest" },
    hotelCategory: hotels,
    priceFrom: 28850,
    priceFromSingle: 32850,
    nextDeparture: { en: "17–25 September 2027", de: "17.–25. September 2027" },
    route: [
      "Budapest",
      "Brașov",
      "Sofia",
      "Kotor",
      "Pula",
      "Rovinj",
      "Ljubljana",
    ],
    heroImage: {
      src: "/images/aircraft/pc12.jpg",
      alt: { en: "The Pilatus PC-12", de: "Die Pilatus PC-12" },
    },
    gallery,
    overview: {
      en: [
        "Fascinating Balkan leads deep into the cultural crossroads of Europe, where the Balkans unfold with striking contrasts and bold character. It begins in Budapest, the regal capital of thermal baths and baroque façades, before flying into the heart of Transylvania.",
        "In Brașov, history and myth come alive; Sofia layers Orthodox spirituality with cutting-edge cuisine; and the Adriatic coast, from Kotor to Rovinj, closes the tour in Ljubljana, Slovenia's green, poetic capital.",
      ],
      de: [
        "Faszinierender Balkan führt tief in die kulturelle Kreuzung Europas, wo sich der Balkan mit auffälligen Kontrasten und markantem Charakter entfaltet. Es beginnt in Budapest, der königlichen Hauptstadt der Thermalbäder und barocken Fassaden, bevor es ins Herz Transsilvaniens geht.",
        "In Brașov erwachen Geschichte und Mythos; Sofia verbindet orthodoxe Spiritualität mit avantgardistischer Küche; und die Adriaküste, von Kotor bis Rovinj, beschließt die Reise in Ljubljana, Sloweniens grüner, poetischer Hauptstadt.",
      ],
    },
    itinerary: [
      {
        day: 1,
        city: "Budapest",
        title: { en: "Thermal City", de: "Thermalstadt" },
        description: {
          en: "We begin in Budapest, the regal capital of thermal baths and baroque façades.",
          de: "Wir beginnen in Budapest, der königlichen Hauptstadt der Thermalbäder und barocken Fassaden.",
        },
      },
      {
        day: 2,
        city: "Budapest → Brașov",
        title: { en: "Into Transylvania", de: "Nach Transsilvanien" },
        description: {
          en: "We fly directly into the heart of Transylvania. In Brașov, history and myth come alive as we wander cobbled streets and visit a mystic castle nestled in the shadows of the Carpathians.",
          de: "Wir fliegen direkt ins Herz Transsilvaniens. In Brașov erwachen Geschichte und Mythos, während wir durch Kopfsteinpflastergassen streifen und ein mystisches Schloss im Schatten der Karpaten besuchen.",
        },
      },
      {
        day: 3,
        city: "Brașov → Sofia",
        title: { en: "Sacred & Surreal", de: "Heilig & surreal" },
        description: {
          en: "Sofia welcomes us with layers of Orthodox spirituality and Balkan eccentricity, from gold-domed cathedrals to an avant-garde dinner where storytelling meets gastronomy.",
          de: "Sofia empfängt uns mit Schichten orthodoxer Spiritualität und balkanischer Exzentrik, von golden gekuppelten Kathedralen bis zu einem avantgardistischen Dinner, in dem Erzählkunst auf Gastronomie trifft.",
        },
      },
      {
        day: 4,
        city: "Sofia → Kotor",
        title: { en: "The Bay of Kotor", de: "Die Bucht von Kotor" },
        description: {
          en: "In Kotor, mountains meet the Adriatic. The medieval old town and the bay are explored by private boat over two nights.",
          de: "In Kotor treffen Berge auf die Adria. Die mittelalterliche Altstadt und die Bucht werden über zwei Nächte per privatem Boot erkundet.",
        },
      },
      {
        day: 5,
        city: "Kotor",
        title: { en: "Adriatic Charms", de: "Reize der Adria" },
        description: {
          en: "Time to enjoy the region's quiet Mediterranean character at an unhurried pace.",
          de: "Zeit, den stillen mediterranen Charakter der Region in aller Ruhe zu genießen.",
        },
      },
      {
        day: 6,
        city: "Kotor → Pula",
        title: { en: "Roman Coast", de: "Römische Küste" },
        description: {
          en: "The day leads to Pula, where a short visit introduces its Roman heritage and coastal setting.",
          de: "Der Tag führt nach Pula, wo ein kurzer Besuch das römische Erbe und die Küstenlage vorstellt.",
        },
      },
      {
        day: 7,
        city: "Pula → Rovinj",
        title: { en: "Coastal Charms", de: "Küstenreize" },
        description: {
          en: "The journey continues to Rovinj, where two nights allow time to explore the old town, walk along the sea and enjoy relaxed dining above the Mediterranean.",
          de: "Die Journey führt weiter nach Rovinj, wo zwei Nächte Zeit lassen, die Altstadt zu erkunden, am Meer entlangzugehen und entspanntes Dining über dem Mittelmeer zu genießen.",
        },
      },
      {
        day: 8,
        city: "Rovinj → Ljubljana",
        title: { en: "Poetic Finale", de: "Poetisches Finale" },
        description: {
          en: "Finally we land in Ljubljana, Slovenia's green, poetic capital, exploring riverside cafés, charming bridges and quiet castle views before a farewell dinner of seasonal alpine cuisine and local wine.",
          de: "Schließlich landen wir in Ljubljana, Sloweniens grüner, poetischer Hauptstadt, erkunden Cafés am Fluss, charmante Brücken und stille Schlossblicke vor einem Abschiedsdinner mit saisonaler alpiner Küche und lokalem Wein.",
        },
      },
      {
        day: 9,
        city: "Ljubljana → Homeward",
        title: { en: "Homeward", de: "Heimwärts" },
        description: {
          en: "We take our leave after a final morning by the river.",
          de: "Wir verabschieden uns nach einem letzten Morgen am Fluss.",
        },
      },
    ] as Day[],
    inclusions: {
      en: [
        "Private jet travel throughout",
        "Luxury ground transport",
        "8 nights in 4★/5★ hotels with breakfast",
        "7 lunches and 8 dinners",
        "Castle visit in Transylvania",
        "City tour of Sofia",
        "Private boat tour in Kotor",
        "Pula city tour",
        "Rovinj city tour",
        "Private Ljubljana exploration",
      ],
      de: [
        "Privatjet-Flüge während der gesamten Journey",
        "Luxuriöse Bodentransporte",
        "8 Nächte in 4★-/5★-Hotels mit Frühstück",
        "7 Mittagessen und 8 Abendessen",
        "Schlossbesuch in Transsilvanien",
        "Stadttour in Sofia",
        "Private Bootstour in Kotor",
        "Stadttour in Pula",
        "Stadttour in Rovinj",
        "Private Erkundung von Ljubljana",
      ],
    },
  },

  {
    slug: "wild-scandinavia",
    published: true,
    featured: false,
    order: 5,
    title: { en: "Wild Scandinavia", de: "Wildes Skandinavien" },
    tagline: {
      en: "Raw north, from fjords to Arctic light.",
      de: "Roher Norden, von Fjorden bis zum arktischen Licht.",
    },
    summary: {
      en: "An upcoming journey through Norway, Sweden and Finland, defined by raw landscapes and Nordic understatement. Expect design-led hotels, seasonal cuisine and curated nature experiences in true Scandinavian style.",
      de: "Eine kommende Journey durch Norwegen, Schweden und Finnland, geprägt von rauen Landschaften und nordischem Understatement. Es erwarten Sie designstarke Hotels, saisonale Küche und kuratierte Naturerlebnisse in echtem skandinavischem Stil.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "Copenhagen", de: "Kopenhagen" },
    hotelCategory: hotels,
    priceFrom: 33650,
    priceFromSingle: 36850,
    nextDeparture: { en: "Preview 2028", de: "Vorschau 2028" },
    route: [
      "Copenhagen",
      "Stavanger",
      "Trondheim",
      "Andenes",
      "Lapland",
      "Helsinki",
      "Stockholm",
    ],
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
        "Wild Scandinavia discovers the majestic vastness of Northern Europe on an exclusive journey through Norway, Sweden and Finland, where raw nature meets Nordic elegance.",
        "From glacier-strewn fjords to serene Arctic tundra, past the Northern Lights and through design-led cities, it brings you closer to the wild beauty of the North than ever before.",
      ],
      de: [
        "Wildes Skandinavien entdeckt die majestätische Weite Nordeuropas auf einer exklusiven Journey durch Norwegen, Schweden und Finnland, wo rohe Natur auf nordische Eleganz trifft.",
        "Von gletscherdurchzogenen Fjorden bis zur stillen arktischen Tundra, vorbei am Nordlicht und durch designstarke Städte, bringt es Sie der wilden Schönheit des Nordens näher als je zuvor.",
      ],
    },
    itinerary: [
      {
        day: 1,
        city: "Copenhagen",
        title: { en: "The North Begins", de: "Der Norden beginnt" },
        description: {
          en: "We gather in Copenhagen, the graceful gateway to the North.",
          de: "Wir versammeln uns in Kopenhagen, dem anmutigen Tor zum Norden.",
        },
      },
      {
        day: 2,
        city: "Copenhagen → Stavanger",
        title: { en: "Fjords & Frontiers", de: "Fjorde & Grenzen" },
        description: {
          en: "We fly to Norway's rugged coast and speed through the Lysefjord on a private RIB safari past towering cliffs and waterfalls.",
          de: "Wir fliegen an Norwegens raue Küste und rasen auf einer privaten RIB-Safari durch den Lysefjord, vorbei an aufragenden Klippen und Wasserfällen.",
        },
      },
      {
        day: 3,
        city: "Stavanger → Trondheim",
        title: { en: "Viking Heritage", de: "Wikingererbe" },
        description: {
          en: "In Trondheim we discover Viking heritage, explore the grand Nidaros Cathedral and taste local farm delicacies in the scenic countryside.",
          de: "In Trondheim entdecken wir das Wikingererbe, erkunden den prächtigen Nidarosdom und probieren lokale Hofdelikatessen in malerischer Landschaft.",
        },
      },
      {
        day: 4,
        city: "Trondheim → Andenes",
        title: { en: "Arctic Wonders", de: "Arktische Wunder" },
        description: {
          en: "Andenes welcomes us to the edge of the Arctic. We set sail on a luxury catamaran for whale watching, then unwind in a Sami-inspired spa before an Arctic feast under the Northern Lights.",
          de: "Andenes empfängt uns am Rand der Arktis. Wir stechen auf einem Luxus-Katamaran zur Walbeobachtung in See, entspannen dann in einem Sami-inspirierten Spa vor einem arktischen Festmahl unter dem Nordlicht.",
        },
      },
      {
        day: 5,
        city: "Andenes → Lapland",
        title: { en: "Frozen Forests", de: "Gefrorene Wälder" },
        description: {
          en: "In Finnish Lapland we race through frozen forests on a husky sled and savour wild flavours in a secluded lodge.",
          de: "Im finnischen Lappland rasen wir mit dem Husky-Schlitten durch gefrorene Wälder und genießen wilde Aromen in einer abgeschiedenen Lodge.",
        },
      },
      {
        day: 6,
        city: "Lapland → Helsinki",
        title: { en: "Nordic Design", de: "Nordisches Design" },
        description: {
          en: "We arrive in Helsinki for a journey through Nordic design and innovation.",
          de: "Wir kommen in Helsinki an, für eine Reise durch nordisches Design und Innovation.",
        },
      },
      {
        day: 7,
        city: "Helsinki → Stockholm",
        title: { en: "Archipelago Elegance", de: "Eleganz der Schären" },
        description: {
          en: "In Stockholm we cruise through the archipelago and walk the royal streets of Gamla Stan.",
          de: "In Stockholm kreuzen wir durch den Schärengarten und gehen durch die königlichen Gassen von Gamla Stan.",
        },
      },
      {
        day: 8,
        city: "Stockholm",
        title: { en: "A Grand Finale", de: "Ein großes Finale" },
        description: {
          en: "We toast to a grand finale in a historic palace hotel.",
          de: "Wir stoßen auf ein großes Finale in einem historischen Palasthotel an.",
        },
      },
      {
        day: 9,
        city: "Stockholm → Copenhagen",
        title: { en: "Homeward", de: "Heimwärts" },
        description: {
          en: "A final flight to Copenhagen closes this unforgettable odyssey through ice, fire and the untamed beauty of the North.",
          de: "Ein letzter Flug nach Kopenhagen beschließt diese unvergessliche Odyssee durch Eis, Feuer und die ungezähmte Schönheit des Nordens.",
        },
      },
    ] as Day[],
    inclusions: {
      en: [
        "Private jet travel throughout",
        "Luxury ground transport",
        "8 nights in 4★/5★ hotels with breakfast",
        "7 lunches and 8 dinners",
        "RIB safari in the Lysefjord, Norway",
        "Trondheim city and farm visit",
        "Whale watching in Andenes",
        "Husky sledding in Lapland (season permitting)",
        "Private sauna experience in Lapland",
        "Design tour in Helsinki",
        "Stockholm archipelago cruise",
      ],
      de: [
        "Privatjet-Flüge während der gesamten Journey",
        "Luxuriöse Bodentransporte",
        "8 Nächte in 4★-/5★-Hotels mit Frühstück",
        "7 Mittagessen und 8 Abendessen",
        "RIB-Safari im Lysefjord, Norwegen",
        "Stadt- und Hofbesuch in Trondheim",
        "Walbeobachtung in Andenes",
        "Husky-Schlittenfahrt in Lappland (je nach Saison)",
        "Privates Sauna-Erlebnis in Lappland",
        "Design-Tour in Helsinki",
        "Schärengarten-Kreuzfahrt in Stockholm",
      ],
    },
  },
];
