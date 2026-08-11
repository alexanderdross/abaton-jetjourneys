// Additional journeys of the ABATON collection.
//
// Content reflects the ABATON 2026 brochure: real routes, included services,
// "from" pricing and scheduled departures. The full itinerary and final detail
// are shared in the personal brochure on request.
//
// ! CONTESTED CONTENT. Section 13 of docs/SPEC.md records route and portfolio
// changes that this file does not yet reflect. The per-journey notes below say
// which parts are superseded. Do NOT "correct" them from the spec alone: the
// rewrites need Isabell's confirmation plus new day-by-day copy, and are
// tracked in docs/OPEN-DECISIONS.md. Guessing produces a plausible itinerary
// that ABATON cannot actually operate.

const guests = { en: "6–8 guests", de: "6–8 Gäste" } as const;
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
    // OPEN DECISION 1.5: overlaps geographically with the newly designed
    // Mediterranean Essence route (San Sebastian, Provence, Sardinia, Suedtirol),
    // which does not exist in this repo. Isabell to confirm whether Mediterranean
    // Essence replaces this journey or both run.
    slug: "secrets-of-europe",
    published: true,
    status: "interest_list",
    featured: false,
    order: 3,
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
    // Content follows the client briefing "ABATON Elegant Islands Website
    // Relaunch Briefing 2027" (docs/BRIEFING-ELEGANT-ISLANDS-2027.md), which
    // supersedes the earlier Galway/Dublin routing. Deliberately withheld per
    // section 18 of that briefing: Knock as a destination, Inverness as a
    // headline stop, airport-selection logic and operator names.
    slug: "elegant-islands",
    published: true,
    status: "open",
    featured: true,
    order: 1,
    title: { en: "Elegant Islands", de: "Elegante Inseln" },
    tagline: {
      en: "Castles, wild landscapes and timeless traditions, connected by private jet across Ireland and Scotland.",
      de: "Schlösser, wilde Landschaften und zeitlose Traditionen, per Privatjet durch Irland und Schottland verbunden.",
    },
    summary: {
      en: "A founder-hosted private jet journey through Ireland and Scotland for just six to eight guests, from the lakes of Killarney and the estate life of Ashford Castle to the Scottish Highlands and historic Edinburgh.",
      de: "Eine vom Gründer begleitete Privatjet-Journey durch Irland und Schottland für nur sechs bis acht Gäste, von den Seen von Killarney über das Gutsleben auf Ashford Castle bis in die schottischen Highlands und das historische Edinburgh.",
    },
    nights: 8,
    guestsLabel: { en: "6–8 guests", de: "6–8 Gäste" },
    guestsMin: 6,
    guestsMax: 8,
    departureCity: { en: "London to London", de: "London nach London" },
    hotelCategory: hotels,
    priceFrom: 30220,
    priceFromSingle: 34420,
    nextDeparture: { en: "13–21 August 2027", de: "13.–21. August 2027" },
    seoTitle: {
      en: "Elegant Islands | Private Jet Journey through Ireland & Scotland | ABATON",
      de: "Elegante Inseln | Privatjet-Reise durch Irland & Schottland | ABATON",
    },
    seoDescription: {
      en: "Discover Ireland and Scotland on a founder-hosted private jet journey for only six to eight guests, from Killarney and Ashford Castle to the Scottish Highlands and Edinburgh.",
      de: "Entdecken Sie Irland und Schottland auf einer von der Gründerin begleiteten Privatjet-Reise für nur sechs bis acht Gäste, von Killarney und Ashford Castle bis in die schottischen Highlands und nach Edinburgh.",
    },
    route: [
      "London",
      "Killarney & the Lakes",
      "Ashford Castle",
      "Scottish Highlands",
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
        "Some of Europe's most memorable places are also among the least effortless to combine. Elegant Islands moves beyond the obvious city itinerary, connecting the lakes of Killarney, the grandeur of Ashford Castle, the untamed Scottish Highlands and historic Edinburgh in one seamless journey.",
        "Travelling in a small group of just six to eight guests, private flights replace lengthy transfers and inconvenient commercial connections. Days are shaped around landscape, culture, gastronomy and carefully chosen experiences, with time deliberately left to enjoy the places themselves.",
        "Every Elegant Islands departure is personally hosted by ABATON founder and private pilot Isabell Buchner, creating a journey that feels less like a traditional group tour and more like travelling within a private circle.",
      ],
      de: [
        "Einige der eindrücklichsten Orte Europas gehören zugleich zu den am schwersten zu verbindenden. Elegante Inseln geht über die naheliegende Städtereise hinaus und verbindet die Seen von Killarney, die Erhabenheit von Ashford Castle, die ungezähmten schottischen Highlands und das historische Edinburgh zu einer durchgängigen Journey.",
        "In einer kleinen Gruppe von nur sechs bis acht Gästen ersetzen private Flüge lange Transfers und unbequeme Linienverbindungen. Die Tage folgen Landschaft, Kultur, Gastronomie und sorgfältig gewählten Erlebnissen, mit bewusst freigehaltener Zeit für die Orte selbst.",
        "Jede Abreise von Elegante Inseln wird persönlich von ABATON-Gründerin und Privatpilotin Isabell Buchner begleitet. So entsteht eine Journey, die weniger einer klassischen Gruppenreise gleicht als dem Reisen in einem privaten Kreis.",
      ],
    },
    signatureMoments: [
      {
        title: {
          en: "Killarney by carriage and lake",
          de: "Killarney per Kutsche und Boot",
        },
        description: {
          en: "A private journey through the landscapes of Killarney National Park, followed by time on the famous lakes.",
          de: "Eine private Fahrt durch die Landschaften des Killarney-Nationalparks, gefolgt von Zeit auf den berühmten Seen.",
        },
      },
      {
        title: { en: "The Gap of Dunloe", de: "Der Gap of Dunloe" },
        description: {
          en: "Cross one of Ireland's most dramatic mountain passes in a privately arranged combination of traditional carriage and boat.",
          de: "Überqueren Sie einen der dramatischsten Bergpässe Irlands in einer privat arrangierten Kombination aus traditioneller Kutsche und Boot.",
        },
      },
      {
        title: { en: "Life at Ashford Castle", de: "Leben auf Ashford Castle" },
        description: {
          en: "Experience the rhythm of a historic Irish estate, from falconry and country pursuits to an elegant castle dinner.",
          de: "Erleben Sie den Rhythmus eines historischen irischen Anwesens, von Falknerei und ländlichen Aktivitäten bis zum eleganten Dinner im Schloss.",
        },
      },
      {
        title: { en: "Across Lough Corrib", de: "Über den Lough Corrib" },
        description: {
          en: "Take to the water from Ashford Castle for a private perspective on the west of Ireland.",
          de: "Gehen Sie von Ashford Castle aus aufs Wasser und erleben Sie den Westen Irlands aus privater Perspektive.",
        },
      },
      {
        title: { en: "Wild Highlands", de: "Wilde Highlands" },
        description: {
          en: "Discover Wester Ross through a privately guided landscape experience, shaped to the interests and activity level of the group.",
          de: "Entdecken Sie Wester Ross bei einem privat geführten Landschaftserlebnis, abgestimmt auf Interessen und Aktivitätsniveau der Gruppe.",
        },
      },
      {
        title: { en: "Whisky in its homeland", de: "Whisky in seiner Heimat" },
        description: {
          en: "Explore Scotland through its most famous spirit, from Highland malts to an intimate tasting in Edinburgh.",
          de: "Erkunden Sie Schottland über seine berühmteste Spirituose, von Highland-Malts bis zu einer privaten Verkostung in Edinburgh.",
        },
      },
      {
        title: {
          en: "Loch Ness by private boat",
          de: "Loch Ness im privaten Boot",
        },
        description: {
          en: "Experience Scotland's most legendary loch from the water before continuing to the capital.",
          de: "Erleben Sie Schottlands legendärsten See vom Wasser aus, bevor es weiter in die Hauptstadt geht.",
        },
      },
      {
        title: {
          en: "A final evening in Edinburgh",
          de: "Ein letzter Abend in Edinburgh",
        },
        description: {
          en: "Historic architecture, whisky culture and an elegant farewell dinner close the journey.",
          de: "Historische Architektur, Whiskykultur und ein elegantes Abschiedsdinner beschließen die Journey.",
        },
      },
    ],
    itinerary: [
      {
        day: 1,
        city: "London",
        title: { en: "London", de: "London" },
        description: {
          en: "The journey begins in London, where guests arrive individually and settle into Mayfair before meeting the small ABATON circle for the first time. In the evening, a relaxed welcome brings everyone together over dinner and introduces the rhythm of the days ahead.",
          de: "Die Journey beginnt in London. Die Gäste reisen individuell an und kommen in Mayfair an, bevor sie den kleinen ABATON-Kreis zum ersten Mal treffen. Am Abend führt ein entspanntes Willkommen alle bei einem Dinner zusammen und stimmt auf den Rhythmus der kommenden Tage ein.",
        },
      },
      {
        day: 2,
        city: "London → Killarney",
        title: { en: "London to Killarney", de: "London nach Killarney" },
        description: {
          en: "After breakfast, a private transfer leads to the business aviation terminal for the first private flight of the journey. In little over an hour, London gives way to the green landscapes of southwest Ireland. The afternoon offers a gentle introduction to Killarney National Park and its lakes before dinner overlooking the Irish countryside.",
          de: "Nach dem Frühstück führt ein privater Transfer zum Business-Aviation-Terminal für den ersten Privatflug der Journey. In gut einer Stunde weicht London den grünen Landschaften Südwestirlands. Der Nachmittag bringt eine ruhige Annäherung an den Killarney-Nationalpark und seine Seen, bevor das Dinner mit Blick über die irische Landschaft folgt.",
        },
      },
      {
        day: 3,
        city: "Killarney",
        title: {
          en: "Killarney & the Gap of Dunloe",
          de: "Killarney & der Gap of Dunloe",
        },
        description: {
          en: "Today is devoted to County Kerry at its most atmospheric. A privately arranged experience combines the Gap of Dunloe, the Black Valley and the Lakes of Killarney, using traditional local transport and time on the water. The afternoon returns to a slower pace, with space for the spa, the lake or simply the view.",
          de: "Dieser Tag gehört County Kerry von seiner stimmungsvollsten Seite. Ein privat arrangiertes Erlebnis verbindet den Gap of Dunloe, das Black Valley und die Seen von Killarney, mit traditionellen lokalen Transportmitteln und Zeit auf dem Wasser. Der Nachmittag wird ruhiger, mit Raum für Spa, See oder einfach die Aussicht.",
        },
      },
      {
        day: 4,
        city: "Killarney → Ashford Castle",
        title: {
          en: "Killarney to Ashford Castle",
          de: "Killarney nach Ashford Castle",
        },
        description: {
          en: "A short private flight replaces hours of driving across Ireland. From the west coast, a chauffeured transfer leads through the countryside to Ashford Castle. After arrival and lunch on the estate, an intimate falconry experience provides an unforgettable first encounter with this historic property.",
          de: "Ein kurzer Privatflug ersetzt stundenlange Fahrten quer durch Irland. Von der Westküste führt ein Chauffeurtransfer durch die Landschaft nach Ashford Castle. Nach Ankunft und Mittagessen auf dem Anwesen sorgt ein privates Falknerei-Erlebnis für eine unvergessliche erste Begegnung mit diesem historischen Haus.",
        },
      },
      {
        day: 5,
        city: "Ashford Castle",
        title: { en: "Ashford Castle", de: "Ashford Castle" },
        description: {
          en: "A full day is left for the estate. Guests choose from selected country pursuits such as horseback riding or clay shooting, while those seeking a quieter pace may enjoy the spa or the grounds. Later, the group takes to Lough Corrib before dressing for an elegant evening within the castle.",
          de: "Ein ganzer Tag bleibt dem Anwesen. Die Gäste wählen aus ländlichen Aktivitäten wie Reiten oder Tontaubenschießen, wer es ruhiger mag, genießt Spa oder Park. Später geht die Gruppe auf den Lough Corrib, bevor man sich für einen eleganten Abend im Schloss kleidet.",
        },
      },
      {
        day: 6,
        city: "Ireland → Scottish Highlands",
        title: {
          en: "Ireland to the Scottish Highlands",
          de: "Irland in die schottischen Highlands",
        },
        description: {
          en: "The journey crosses the Irish Sea by private jet and continues by chauffeur into Wester Ross. Here, the landscape becomes larger, quieter and more remote. The afternoon is deliberately unhurried, allowing time to settle into the Highlands before an informal dinner and, for those who wish, a first tasting of Scotch whisky.",
          de: "Die Journey überquert die Irische See im Privatjet und führt per Chauffeur weiter nach Wester Ross. Hier wird die Landschaft weiter, stiller und abgelegener. Der Nachmittag bleibt bewusst unaufgeregt und lässt Zeit, in den Highlands anzukommen, bevor ein informelles Dinner folgt und, wer mag, eine erste Verkostung schottischen Whiskys.",
        },
      },
      {
        day: 7,
        city: "Scottish Highlands",
        title: {
          en: "The Scottish Highlands",
          de: "Die schottischen Highlands",
        },
        description: {
          en: "A private Highland day is shaped around the landscape and the interests of the group, from a scenic guided exploration to walking or time on the water. The experience is intentionally personal rather than prescriptive. The evening closes with a destination dinner celebrating Scotland's produce and sense of place.",
          de: "Ein privater Highland-Tag richtet sich nach der Landschaft und den Interessen der Gruppe, von einer geführten Panorama-Erkundung über Wanderungen bis zu Zeit auf dem Wasser. Das Erlebnis ist bewusst persönlich statt vorgegeben. Der Abend klingt mit einem Dinner aus, das Schottlands Produkte und seinen Charakter feiert.",
        },
      },
      {
        day: 8,
        city: "Loch Ness → Edinburgh",
        title: { en: "Loch Ness to Edinburgh", de: "Loch Ness nach Edinburgh" },
        description: {
          en: "On the way back east, the group pauses for a private experience on Loch Ness before taking a short private flight to Edinburgh. The afternoon introduces the city's castle and historic centre, followed by an intimate Scotch whisky experience and a final dinner together.",
          de: "Auf dem Weg zurück nach Osten hält die Gruppe für ein privates Erlebnis auf Loch Ness, bevor ein kurzer Privatflug nach Edinburgh folgt. Der Nachmittag führt zu Schloss und historischer Altstadt der Stadt, danach folgen eine private Whisky-Verkostung und ein letztes gemeinsames Dinner.",
        },
      },
      {
        day: 9,
        city: "Edinburgh → London",
        title: { en: "Edinburgh to London", de: "Edinburgh nach London" },
        description: {
          en: "After breakfast, a final private flight returns the group to London. Chauffeur arrangements can then connect guests with central London, Heathrow or individual onward travel.",
          de: "Nach dem Frühstück bringt ein letzter Privatflug die Gruppe zurück nach London. Chauffeurarrangements verbinden die Gäste anschließend mit der Londoner Innenstadt, Heathrow oder der individuellen Weiterreise.",
        },
      },
    ] as Day[],
    stays: [
      {
        title: { en: "London", de: "London" },
        description: {
          en: "A leading five-star address in Mayfair, chosen as a calm starting point within walking distance of the city's best.",
          de: "Ein führendes Fünf-Sterne-Haus in Mayfair, als ruhiger Ausgangspunkt in Gehweite der besten Adressen der Stadt.",
        },
      },
      {
        title: { en: "Killarney", de: "Killarney" },
        description: {
          en: "A five-star lakeside resort with views across the water to the mountains of County Kerry.",
          de: "Ein Fünf-Sterne-Resort am See mit Blick über das Wasser auf die Berge von County Kerry.",
        },
      },
      {
        title: { en: "Ashford Castle", de: "Ashford Castle" },
        description: {
          en: "Two nights of estate life in one of Ireland's most celebrated castle hotels, and one of the journey's principal reasons to travel.",
          de: "Zwei Nächte Gutsleben in einem der berühmtesten Schlosshotels Irlands, und einer der eigentlichen Gründe für diese Journey.",
        },
      },
      {
        title: { en: "Scottish Highlands", de: "Schottische Highlands" },
        description: {
          en: "A characterful five-star Highland retreat in Wester Ross, remote enough that the landscape sets the pace.",
          de: "Ein charaktervolles Fünf-Sterne-Refugium in Wester Ross, abgelegen genug, dass die Landschaft den Takt vorgibt.",
        },
      },
      {
        title: { en: "Edinburgh", de: "Edinburgh" },
        description: {
          en: "A landmark five-star city hotel for the final night, within the historic centre.",
          de: "Ein Fünf-Sterne-Haus mit Wahrzeichencharakter für die letzte Nacht, mitten im historischen Zentrum.",
        },
      },
    ],
    inclusions: {
      en: [
        "8 nights in carefully selected five-star hotels and historic properties",
        "Private flights between the journey regions, in an aircraft appropriate to the route and group size",
        "Private airport and scheduled programme transfers during the journey",
        "Daily breakfast, and selected lunches and dinners as described in the final journey programme",
        "Curated private and small-group experiences throughout Ireland and Scotland",
        "Personal hosting by the ABATON founder for the duration of the journey",
        "Access to the private ABATON guest area after booking confirmation",
        "Pre-departure concierge support and personal travel-preference management",
      ],
      de: [
        "8 Nächte in sorgfältig ausgewählten Fünf-Sterne-Hotels und historischen Häusern",
        "Private Flüge zwischen den Regionen der Journey, in einem der Route und Gruppengröße angemessenen Flugzeug",
        "Private Flughafen- und Programmtransfers während der Journey",
        "Täglich Frühstück sowie ausgewählte Mittag- und Abendessen gemäß dem finalen Reiseprogramm",
        "Kuratierte private und exklusive Erlebnisse in ganz Irland und Schottland",
        "Persönliche Begleitung durch die ABATON-Gründerin während der gesamten Journey",
        "Zugang zum privaten ABATON-Gästebereich nach Buchungsbestätigung",
        "Concierge-Betreuung vor der Abreise und persönliche Verwaltung Ihrer Reisepräferenzen",
      ],
    },
    exclusions: {
      en: [
        "International flights to and from London",
        "Personal pre- and post-journey hotel nights, unless explicitly included",
        "Individual chauffeur requests outside the published programme",
        "Spa treatments and personal purchases",
        "Travel insurance, unless offered as a defined package component",
      ],
      de: [
        "Internationale Flüge nach und von London",
        "Persönliche Hotelnächte vor und nach der Journey, sofern nicht ausdrücklich enthalten",
        "Individuelle Chauffeurwünsche außerhalb des veröffentlichten Programms",
        "Spa-Anwendungen und persönliche Einkäufe",
        "Reiseversicherung, sofern nicht als definierter Paketbestandteil angeboten",
      ],
    },
    faq: [
      {
        question: {
          en: "Is this a private charter for one couple or family?",
          de: "Ist dies ein Privatcharter für ein Paar oder eine Familie?",
        },
        answer: {
          en: "Elegant Islands is a hosted small-group journey limited to six to eight guests. The private aircraft is shared exclusively by the ABATON group during the published flight sectors.",
          de: "Elegante Inseln ist eine begleitete Journey in kleiner Gruppe, begrenzt auf sechs bis acht Gäste. Das private Flugzeug wird während der veröffentlichten Flugabschnitte ausschließlich von der ABATON-Gruppe genutzt.",
        },
      },
      {
        question: {
          en: "Which aircraft will be used?",
          de: "Welches Flugzeug kommt zum Einsatz?",
        },
        answer: {
          en: "ABATON selects an aircraft suitable for the route, group size and operational requirements. The final aircraft and operator are confirmed before departure and may vary from the illustrative aircraft shown.",
          de: "ABATON wählt ein Flugzeug, das zu Route, Gruppengröße und betrieblichen Anforderungen passt. Das endgültige Flugzeug und der Betreiber werden vor der Abreise bestätigt und können von der beispielhaft gezeigten Maschine abweichen.",
        },
      },
      {
        question: {
          en: "How much luggage can I bring?",
          de: "Wie viel Gepäck kann ich mitnehmen?",
        },
        answer: {
          en: "Private aircraft have different baggage limitations from commercial airlines. Guests receive a journey-specific baggage guide before departure; soft-sided luggage is generally recommended.",
          de: "Für private Flugzeuge gelten andere Gepäckgrenzen als für Linienfluggesellschaften. Die Gäste erhalten vor der Abreise einen reisespezifischen Gepäckleitfaden; weiches Gepäck wird generell empfohlen.",
        },
      },
      {
        question: {
          en: "How active is the journey?",
          de: "Wie aktiv ist die Journey?",
        },
        answer: {
          en: "The itinerary balances cultural visits and outdoor experiences with free time. Selected activities can be adapted to different comfort and activity levels wherever possible.",
          de: "Das Programm verbindet kulturelle Besuche und Erlebnisse im Freien mit freier Zeit. Ausgewählte Aktivitäten lassen sich, wo immer möglich, an unterschiedliche Komfort- und Aktivitätsniveaus anpassen.",
        },
      },
      {
        question: {
          en: "Can dietary requirements be accommodated?",
          de: "Können besondere Ernährungswünsche berücksichtigt werden?",
        },
        answer: {
          en: "Yes. Booked guests can provide allergies, intolerances and preferences in the private guest area before departure. These are shared with the relevant hospitality partners.",
          de: "Ja. Gebuchte Gäste können Allergien, Unverträglichkeiten und Vorlieben vor der Abreise im privaten Gästebereich hinterlegen. Diese werden an die jeweiligen Gastgeber weitergegeben.",
        },
      },
      {
        question: {
          en: "Can I arrive in London earlier or stay longer?",
          de: "Kann ich früher in London ankommen oder länger bleiben?",
        },
        answer: {
          en: "Yes. Additional hotel nights and individual chauffeur arrangements can be requested through the ABATON concierge service.",
          de: "Ja. Zusätzliche Hotelnächte und individuelle Chauffeurarrangements können über den ABATON-Concierge-Service angefragt werden.",
        },
      },
      {
        question: {
          en: "When is the departure confirmed?",
          de: "Wann gilt die Abreise als bestätigt?",
        },
        answer: {
          en: "The booking documentation will state the conditions under which the journey is confirmed, including any applicable minimum participant requirement.",
          de: "Die Buchungsunterlagen nennen die Bedingungen, unter denen die Journey bestätigt wird, einschließlich einer etwaigen Mindestteilnehmerzahl.",
        },
      },
      {
        question: {
          en: "Will every programme detail be exactly as published?",
          de: "Wird jedes Programmdetail genau wie veröffentlicht stattfinden?",
        },
        answer: {
          en: "The character and principal destinations of the journey remain as described. Individual timings, restaurants, activities or routing details may be adjusted where operational conditions or local availability require an equivalent or improved alternative.",
          de: "Charakter und Hauptziele der Journey bleiben wie beschrieben. Einzelne Zeiten, Restaurants, Aktivitäten oder Routenführungen können angepasst werden, wenn betriebliche Umstände oder örtliche Verfügbarkeit eine gleichwertige oder bessere Alternative erfordern.",
        },
      },
    ],
  },

  {
    // OPEN DECISION 1.2: route below is SUPERSEDED. Sofia and Ljubljana have
    // been removed; the current version is Budapest, Brasov, Rovinj/Pula, Kotor,
    // Albanian Riviera (Vlora), still 4 stations.
    slug: "fascinating-balkan",
    published: true,
    status: "interest_list",
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
    // OPEN DECISION 1.3: route below is SUPERSEDED. The redesign starts and ends
    // in Hamburg, not Copenhagen, with Bergen, Tromsoe, Rovaniemi, Stockholm.
    // The "Preview 2028" departure also needs confirming. This journey is in
    // development but renders identically to a bookable one, because the model
    // has no `status` field yet (spec section 5).
    slug: "wild-scandinavia",
    published: true,
    status: "interest_list",
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
