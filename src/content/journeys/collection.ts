// The ABATON collection: four journeys, per the final client documents
// "ABATON_Seitenaufbau_und_Texte_UEBERARBEITET" (public copy + portfolio) and
// "ABATON_Website_Briefing_FINAL" (structure, footer, legal).
//
// Portfolio, confirmed by the client:
//   - Elegant Islands       status: open          (the single 2027 booking)
//   - Mediterranean Essence status: interest_list  (new journey)
//   - Fascinating Balkan    status: interest_list  (route reworked)
//   - Wild Scandinavia      status: interest_list  (route reworked, stays Copenhagen)
//
// Retired with client sign-off (legacy URLs 301 to /journeys/ via
// src/lib/legacy-redirects.ts): Finest of Europe, Secrets of Europe.
//
// Interest-list journeys deliberately carry no price, no single price and no
// fixed departure: price and dates appear only once a journey is released for
// reservations. JourneyCard and JsonLd already render price/offer conditionally
// on `priceFrom`, so omitting it hides both automatically.

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
    // Content follows the final client documents. The corrected five-chapter
    // route (London, Killarney, Ashford Castle, Scottish Highlands, Edinburgh)
    // and the 2027 briefing stand. Deliberately withheld per that briefing:
    // Knock as a destination, Inverness as a headline, airport-selection logic
    // and operator names.
    slug: "elegant-islands",
    published: true,
    status: "open",
    featured: true,
    order: 1,
    title: { en: "Elegant Islands", de: "Elegante Inseln" },
    countries: {
      en: "England · Ireland · Scotland",
      de: "England · Irland · Schottland",
    },
    tagline: {
      en: "Castles, wild landscapes and traditions across Ireland and Scotland, connected by private jet.",
      de: "Schlösser, wilde Landschaften und Traditionen in Irland und Schottland, per Privatjet verbunden.",
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
        "Elegant Islands is a founder-hosted private jet journey through Ireland and Scotland for just six to eight guests. The journey begins in London before continuing to Killarney, Ashford Castle, the Scottish Highlands and Edinburgh.",
        "Private flights connect the different regions and allow the itinerary to follow a natural route across Ireland and Scotland. Days are shaped around landscape, culture, local traditions and cuisine, with enough time to enjoy the hotels and surroundings along the way.",
        "Each departure is personally hosted by ABATON founder and private pilot Isabell Buchner.",
      ],
      de: [
        "Elegante Inseln ist eine vom Gründer begleitete Privatjet-Journey durch Irland und Schottland für nur sechs bis acht Gäste. Die Journey beginnt in London und führt weiter nach Killarney, Ashford Castle, in die schottischen Highlands und nach Edinburgh.",
        "Private Flüge verbinden die einzelnen Regionen und lassen die Route einem natürlichen Verlauf durch Irland und Schottland folgen. Die Tage folgen Landschaft, Kultur, lokalen Traditionen und Küche, mit genügend Zeit, Hotels und Umgebung zu genießen.",
        "Jede Abreise wird persönlich von ABATON-Gründerin und Privatpilotin Isabell Buchner begleitet.",
      ],
    },
    signatureMoments: [
      {
        title: {
          en: "Killarney & the Lakes",
          de: "Killarney & die Seen",
        },
        description: {
          en: "Discover the landscapes around Killarney through selected private experiences on land and water.",
          de: "Entdecken Sie die Landschaften rund um Killarney bei ausgewählten privaten Erlebnissen zu Land und zu Wasser.",
        },
      },
      {
        title: { en: "Life at Ashford Castle", de: "Leben auf Ashford Castle" },
        description: {
          en: "Spend two nights on one of Ireland's historic estates, with time for selected country pursuits, the grounds and the atmosphere of the castle.",
          de: "Verbringen Sie zwei Nächte auf einem der historischen Anwesen Irlands, mit Zeit für ausgewählte ländliche Aktivitäten, den Park und die Atmosphäre des Schlosses.",
        },
      },
      {
        title: {
          en: "The Scottish Highlands",
          de: "Die schottischen Highlands",
        },
        description: {
          en: "Experience the landscapes of the Highlands through a privately guided day shaped around the region and the interests of the group.",
          de: "Erleben Sie die Landschaften der Highlands bei einem privat geführten Tag, abgestimmt auf die Region und die Interessen der Gruppe.",
        },
      },
      {
        title: { en: "Loch Ness", de: "Loch Ness" },
        description: {
          en: "See one of Scotland's best known landscapes from the water as the journey continues towards Edinburgh.",
          de: "Erleben Sie eine der bekanntesten Landschaften Schottlands vom Wasser aus, während die Journey weiter nach Edinburgh führt.",
        },
      },
      {
        title: { en: "Edinburgh", de: "Edinburgh" },
        description: {
          en: "Finish the journey among the historic streets of Edinburgh, with Scottish culture, cuisine and a final evening together.",
          de: "Beschließen Sie die Journey in den historischen Gassen Edinburghs, mit schottischer Kultur, Küche und einem letzten gemeinsamen Abend.",
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
    programmeNote: {
      en: "The itinerary describes the planned character and route of Elegant Islands. Hotels, restaurants, individual activities, timings and selected programme details are finalised according to availability, season and local conditions and are communicated in the final journey programme.",
      de: "Der Reiseverlauf beschreibt den geplanten Charakter und die Route von Elegante Inseln. Hotels, Restaurants, einzelne Aktivitäten, Zeiten und ausgewählte Programmdetails werden nach Verfügbarkeit, Saison und örtlichen Bedingungen festgelegt und im finalen Reiseprogramm mitgeteilt.",
    },
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
        "8 nights in carefully selected hotels and character properties",
        "Private flights between the journey regions according to the final itinerary",
        "Private airport transfers and scheduled ground transportation during the journey",
        "Daily breakfast, and selected lunches and dinners according to the final programme",
        "Curated cultural, landscape and culinary experiences",
        "Personal hosting throughout the journey",
        "Pre-departure travel coordination",
        "Access to the private ABATON Circle after booking confirmation",
      ],
      de: [
        "8 Nächte in sorgfältig ausgewählten Hotels und Charakterhäusern",
        "Private Flüge zwischen den Regionen der Journey gemäß dem finalen Reiseverlauf",
        "Private Flughafentransfers und Bodentransporte gemäß Programm während der Journey",
        "Täglich Frühstück sowie ausgewählte Mittag- und Abendessen gemäß dem finalen Programm",
        "Kuratierte kulturelle, landschaftliche und kulinarische Erlebnisse",
        "Persönliche Begleitung während der gesamten Journey",
        "Reisekoordination vor der Abreise",
        "Zugang zum privaten ABATON Circle nach Buchungsbestätigung",
      ],
    },
    exclusions: {
      en: [
        "International travel to and from London",
        "Personal pre- and post-journey hotel nights, unless explicitly included",
        "Individual chauffeur requests outside the published programme",
        "Spa treatments and personal purchases",
        "Travel insurance, unless offered as a defined package component",
      ],
      de: [
        "Internationale An- und Abreise nach und von London",
        "Persönliche Hotelnächte vor und nach der Journey, sofern nicht ausdrücklich enthalten",
        "Individuelle Chauffeurwünsche außerhalb des veröffentlichten Programms",
        "Spa-Anwendungen und persönliche Einkäufe",
        "Reiseversicherung, sofern nicht als definierter Paketbestandteil angeboten",
      ],
    },
    faq: [
      {
        question: {
          en: "Where does Elegant Islands begin and end?",
          de: "Wo beginnt und endet Elegante Inseln?",
        },
        answer: {
          en: "The journey begins and ends in London. Guests arrange their individual international travel to and from London.",
          de: "Die Journey beginnt und endet in London. Die Gäste organisieren ihre individuelle internationale An- und Abreise nach und von London selbst.",
        },
      },
      {
        question: {
          en: "How active is the journey?",
          de: "Wie aktiv ist die Journey?",
        },
        answer: {
          en: "Elegant Islands combines cultural, landscape and outdoor experiences with regular periods of free time. Selected activities can be adapted according to individual interests and activity levels.",
          de: "Elegante Inseln verbindet kulturelle, landschaftliche und Erlebnisse im Freien mit regelmäßiger freier Zeit. Ausgewählte Aktivitäten lassen sich an individuelle Interessen und Aktivitätsniveaus anpassen.",
        },
      },
      {
        question: {
          en: "Can I arrive in London earlier or stay longer?",
          de: "Kann ich früher in London ankommen oder länger bleiben?",
        },
        answer: {
          en: "Yes. Additional hotel nights, airport transfers and individual arrangements before or after the journey can be requested separately.",
          de: "Ja. Zusätzliche Hotelnächte, Flughafentransfers und individuelle Arrangements vor oder nach der Journey können separat angefragt werden.",
        },
      },
    ],
  },

  {
    // New journey, per the final client document (section 3.1.2). Interest List:
    // no price, no departure date. Route replaces the retired Secrets of Europe.
    slug: "mediterranean-essence",
    published: true,
    status: "interest_list",
    featured: false,
    order: 2,
    title: { en: "Mediterranean Essence", de: "Mediterrane Essenz" },
    countries: {
      en: "Switzerland · France · Spain · Italy",
      de: "Schweiz · Frankreich · Spanien · Italien",
    },
    tagline: {
      en: "Mediterranean coastlines, regional cuisine, Tuscan landscapes and the mountains of South Tyrol.",
      de: "Mediterrane Küsten, regionale Küche, toskanische Landschaften und die Berge Südtirols.",
    },
    summary: {
      en: "Mediterranean Essence connects some of Southern Europe's most distinctive regions in one private jet journey for six to eight guests, from the French Riviera and San Sebastián to the Tuscan countryside and the Dolomites.",
      de: "Mediterrane Essenz verbindet einige der markantesten Regionen Südeuropas zu einer Privatjet-Journey für sechs bis acht Gäste, von der Französischen Riviera und San Sebastián bis in die toskanische Landschaft und die Dolomiten.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "Zurich to Zurich", de: "Zürich nach Zürich" },
    hotelCategory: hotels,
    route: [
      "Zurich",
      "French Riviera",
      "San Sebastián",
      "Tuscany",
      "South Tyrol & the Dolomites",
    ],
    heroImage: {
      src: "/images/experiences/dining.jpg",
      alt: {
        en: "Regional Mediterranean cuisine",
        de: "Regionale mediterrane Küche",
      },
    },
    gallery,
    overview: {
      en: [
        "Mediterranean Essence connects some of Southern Europe's most distinctive regions in one private jet journey for six to eight guests. Beginning in Zurich, the route continues to the French Riviera, San Sebastián, the Tuscan countryside and South Tyrol before returning to Switzerland.",
        "Each region brings a different perspective to the journey. Mediterranean coastlines and art give way to the food culture of the Basque Country, the vineyards and landscapes of Tuscany and the mountains of the Dolomites. Private flights connect the different chapters of the route, while personally selected hotels, local cuisine and regional experiences shape the time on the ground.",
        "Each departure is personally hosted by ABATON founder and private pilot Isabell Buchner.",
      ],
      de: [
        "Mediterrane Essenz verbindet einige der markantesten Regionen Südeuropas zu einer Privatjet-Journey für sechs bis acht Gäste. Beginnend in Zürich führt die Route weiter an die Französische Riviera, nach San Sebastián, in die toskanische Landschaft und nach Südtirol, bevor sie in die Schweiz zurückkehrt.",
        "Jede Region bringt eine eigene Perspektive in die Journey. Mediterrane Küsten und Kunst weichen der Esskultur des Baskenlands, den Weinbergen und Landschaften der Toskana und den Bergen der Dolomiten. Private Flüge verbinden die einzelnen Kapitel der Route, während persönlich ausgewählte Hotels, lokale Küche und regionale Erlebnisse die Zeit vor Ort prägen.",
        "Jede Abreise wird persönlich von ABATON-Gründerin und Privatpilotin Isabell Buchner begleitet.",
      ],
    },
    signatureMoments: [
      {
        title: { en: "The French Riviera", de: "Die Französische Riviera" },
        description: {
          en: "Experience the Mediterranean through selected coastal, cultural and culinary moments along the Côte d'Azur.",
          de: "Erleben Sie das Mittelmeer bei ausgewählten Momenten an Küste, Kultur und Küche entlang der Côte d'Azur.",
        },
      },
      {
        title: { en: "San Sebastián", de: "San Sebastián" },
        description: {
          en: "Discover one of Europe's most recognised culinary destinations, with time for the city, the coast and the food culture of the Basque Country.",
          de: "Entdecken Sie eines der renommiertesten kulinarischen Ziele Europas, mit Zeit für die Stadt, die Küste und die Esskultur des Baskenlands.",
        },
      },
      {
        title: {
          en: "The Tuscan Countryside",
          de: "Die toskanische Landschaft",
        },
        description: {
          en: "Spend two nights among vineyards, historic towns and rural landscapes, with a programme shaped around regional food, wine and local life.",
          de: "Verbringen Sie zwei Nächte zwischen Weinbergen, historischen Städtchen und ländlichen Landschaften, mit einem Programm rund um regionale Küche, Wein und lokales Leben.",
        },
      },
      {
        title: { en: "South Tyrol", de: "Südtirol" },
        description: {
          en: "Experience the meeting of Alpine and Mediterranean culture through mountain landscapes, regional cuisine and locally rooted hospitality.",
          de: "Erleben Sie das Zusammentreffen von alpiner und mediterraner Kultur durch Bergwelten, regionale Küche und lokal verwurzelte Gastlichkeit.",
        },
      },
      {
        title: { en: "The Dolomites", de: "Die Dolomiten" },
        description: {
          en: "Finish the journey in one of Europe's most distinctive mountain regions, with time for the landscape and a slower final chapter before returning to Zurich.",
          de: "Beschließen Sie die Journey in einer der markantesten Bergregionen Europas, mit Zeit für die Landschaft und einem ruhigeren Schlusskapitel vor der Rückkehr nach Zürich.",
        },
      },
    ],
    itinerary: [
      {
        day: 1,
        city: "Zurich",
        title: { en: "Zurich", de: "Zürich" },
        description: {
          en: "Guests arrive individually in Zurich and settle into the first hotel. The group meets in the evening for a welcome dinner and the beginning of the journey.",
          de: "Die Gäste reisen individuell in Zürich an und kommen im ersten Hotel an. Am Abend trifft sich die Gruppe zu einem Willkommensdinner und zum Auftakt der Journey.",
        },
      },
      {
        day: 2,
        city: "Zurich → French Riviera",
        title: {
          en: "Zurich to the French Riviera",
          de: "Zürich an die Französische Riviera",
        },
        description: {
          en: "The first private flight takes the group from Switzerland to the Mediterranean. The afternoon is spent discovering selected places along the French Riviera, with time for the coast and the atmosphere of the region before dinner.",
          de: "Der erste Privatflug bringt die Gruppe von der Schweiz ans Mittelmeer. Der Nachmittag gilt ausgewählten Orten entlang der Französischen Riviera, mit Zeit für die Küste und die Atmosphäre der Region vor dem Dinner.",
        },
      },
      {
        day: 3,
        city: "French Riviera → San Sebastián",
        title: {
          en: "French Riviera to San Sebastián",
          de: "Französische Riviera nach San Sebastián",
        },
        description: {
          en: "The morning leaves time for a final Riviera experience before the journey continues by private jet to northern Spain. On arrival, San Sebastián introduces a different side of the journey, shaped by the sea, the old town and its food culture.",
          de: "Der Morgen lässt Zeit für ein letztes Riviera-Erlebnis, bevor die Journey per Privatjet nach Nordspanien führt. Bei der Ankunft zeigt San Sebastián eine andere Seite der Journey, geprägt vom Meer, der Altstadt und ihrer Esskultur.",
        },
      },
      {
        day: 4,
        city: "San Sebastián",
        title: {
          en: "San Sebastián & the Basque Country",
          de: "San Sebastián & das Baskenland",
        },
        description: {
          en: "A full day is dedicated to the city and its surrounding region. The programme combines local food culture with selected experiences along the Basque coast and leaves time to enjoy San Sebastián independently.",
          de: "Ein ganzer Tag gehört der Stadt und ihrer Umgebung. Das Programm verbindet lokale Esskultur mit ausgewählten Erlebnissen entlang der baskischen Küste und lässt Zeit, San Sebastián auf eigene Faust zu genießen.",
        },
      },
      {
        day: 5,
        city: "San Sebastián → Tuscany",
        title: {
          en: "San Sebastián to Tuscany",
          de: "San Sebastián in die Toskana",
        },
        description: {
          en: "The journey continues by private jet to Italy. From the airport, a private transfer leads into the Tuscan countryside, where vineyards, historic villages and a more rural rhythm define the next two nights.",
          de: "Die Journey führt per Privatjet weiter nach Italien. Vom Flughafen bringt ein privater Transfer in die toskanische Landschaft, wo Weinberge, historische Dörfer und ein ländlicherer Rhythmus die nächsten zwei Nächte bestimmen.",
        },
      },
      {
        day: 6,
        city: "Tuscany",
        title: { en: "Tuscany", de: "Toskana" },
        description: {
          en: "The day is shaped around the landscape and traditions of Tuscany. Depending on the final programme, experiences may include regional wine, local producers, historic towns, art or a privately guided exploration of the countryside. Time at the hotel forms part of the day.",
          de: "Der Tag richtet sich nach Landschaft und Traditionen der Toskana. Je nach finalem Programm können Erlebnisse regionalen Wein, lokale Erzeuger, historische Städtchen, Kunst oder eine privat geführte Erkundung der Landschaft umfassen. Zeit im Hotel gehört zum Tag.",
        },
      },
      {
        day: 7,
        city: "Tuscany → South Tyrol",
        title: {
          en: "Tuscany to South Tyrol",
          de: "Toskana nach Südtirol",
        },
        description: {
          en: "A private flight connects central Italy with the Alpine north. The journey continues into South Tyrol and the Dolomites, where the final chapter combines mountain landscapes with regional hospitality.",
          de: "Ein Privatflug verbindet Mittelitalien mit dem alpinen Norden. Die Journey führt weiter nach Südtirol und in die Dolomiten, wo das Schlusskapitel Bergwelten mit regionaler Gastlichkeit verbindet.",
        },
      },
      {
        day: 8,
        city: "South Tyrol & the Dolomites",
        title: {
          en: "South Tyrol & the Dolomites",
          de: "Südtirol & die Dolomiten",
        },
        description: {
          en: "The day is dedicated to the mountains. The programme is adapted to the season and the interests of the group and may combine landscape, local culture, cuisine and selected outdoor experiences. The final evening is spent together over dinner.",
          de: "Der Tag gehört den Bergen. Das Programm richtet sich nach Saison und Interessen der Gruppe und kann Landschaft, lokale Kultur, Küche und ausgewählte Erlebnisse im Freien verbinden. Der letzte Abend klingt bei einem gemeinsamen Dinner aus.",
        },
      },
      {
        day: 9,
        city: "South Tyrol → Zurich",
        title: { en: "South Tyrol to Zurich", de: "Südtirol nach Zürich" },
        description: {
          en: "After breakfast, the final private flight returns the group to Zurich. Individual onward travel can continue after arrival.",
          de: "Nach dem Frühstück bringt der letzte Privatflug die Gruppe zurück nach Zürich. Die individuelle Weiterreise kann nach der Ankunft fortgesetzt werden.",
        },
      },
    ] as Day[],
    programmeNote: {
      en: "The itinerary describes the planned character and route of Mediterranean Essence. The departure date, hotels, restaurants, individual activities, timings and selected programme details are confirmed when the journey is released for reservations and according to availability, season and local conditions.",
      de: "Der Reiseverlauf beschreibt den geplanten Charakter und die Route von Mediterrane Essenz. Abreisedatum, Hotels, Restaurants, einzelne Aktivitäten, Zeiten und ausgewählte Programmdetails werden bestätigt, sobald die Journey für Reservierungen freigegeben ist, sowie nach Verfügbarkeit, Saison und örtlichen Bedingungen.",
    },
    stays: [
      {
        title: { en: "Zurich", de: "Zürich" },
        description: {
          en: "A refined Swiss city hotel as a calm starting point before the journey south.",
          de: "Ein kultiviertes Schweizer Stadthotel als ruhiger Ausgangspunkt vor der Reise gen Süden.",
        },
      },
      {
        title: { en: "French Riviera", de: "Französische Riviera" },
        description: {
          en: "A characterful property on the Côte d'Azur, close to the sea and the light of the Mediterranean.",
          de: "Ein charaktervolles Haus an der Côte d'Azur, nah am Meer und am Licht des Mittelmeers.",
        },
      },
      {
        title: { en: "San Sebastián", de: "San Sebastián" },
        description: {
          en: "A historic address in the centre of San Sebastián, within reach of the bay and the old town.",
          de: "Ein historisches Haus im Zentrum von San Sebastián, in Reichweite von Bucht und Altstadt.",
        },
      },
      {
        title: { en: "Tuscany", de: "Toskana" },
        description: {
          en: "An owner-managed Tuscan estate among vineyards and countryside for two unhurried nights.",
          de: "Ein inhabergeführtes toskanisches Anwesen zwischen Weinbergen und Landschaft für zwei ruhige Nächte.",
        },
      },
      {
        title: { en: "South Tyrol", de: "Südtirol" },
        description: {
          en: "A locally rooted hotel in South Tyrol, where the mountains set the pace for the final chapter.",
          de: "Ein lokal verwurzeltes Hotel in Südtirol, in dem die Berge den Takt für das Schlusskapitel vorgeben.",
        },
      },
    ],
    inclusions: {
      en: [
        "8 nights in carefully selected hotels and character properties",
        "Private flights between the journey regions according to the final itinerary",
        "Private airport transfers and scheduled ground transportation",
        "Daily breakfast, and selected lunches and dinners",
        "Curated cultural, culinary and landscape experiences",
        "Personal hosting throughout the journey",
        "Pre-departure travel coordination",
        "Access to the private ABATON Circle after booking confirmation",
      ],
      de: [
        "8 Nächte in sorgfältig ausgewählten Hotels und Charakterhäusern",
        "Private Flüge zwischen den Regionen der Journey gemäß dem finalen Reiseverlauf",
        "Private Flughafentransfers und Bodentransporte gemäß Programm",
        "Täglich Frühstück sowie ausgewählte Mittag- und Abendessen",
        "Kuratierte kulturelle, kulinarische und landschaftliche Erlebnisse",
        "Persönliche Begleitung während der gesamten Journey",
        "Reisekoordination vor der Abreise",
        "Zugang zum privaten ABATON Circle nach Buchungsbestätigung",
      ],
    },
    faq: [
      {
        question: {
          en: "Where will Mediterranean Essence begin and end?",
          de: "Wo wird Mediterrane Essenz beginnen und enden?",
        },
        answer: {
          en: "The journey is planned to begin and end in Zurich.",
          de: "Die Journey soll in Zürich beginnen und enden.",
        },
      },
      {
        question: {
          en: "When will reservations open?",
          de: "Wann werden Reservierungen geöffnet?",
        },
        answer: {
          en: "Registered guests receive priority information when the next departure is released.",
          de: "Registrierte Gäste erhalten vorrangig Informationen, sobald die nächste Abreise freigegeben wird.",
        },
      },
      {
        question: {
          en: "How active will the journey be?",
          de: "Wie aktiv wird die Journey sein?",
        },
        answer: {
          en: "The programme will combine cultural, culinary and landscape experiences with time at the hotels and destinations. Selected activities will be adapted to the season and the interests of the group.",
          de: "Das Programm verbindet kulturelle, kulinarische und landschaftliche Erlebnisse mit Zeit in den Hotels und an den Zielen. Ausgewählte Aktivitäten werden an Saison und Interessen der Gruppe angepasst.",
        },
      },
    ],
  },

  {
    // Route reworked per the final client document (section 3.1.3): Budapest,
    // Transylvania, Bay of Kotor, Istria, Salzburg. The earlier Sofia, Pula,
    // Rovinj and Ljubljana stops are retired.
    slug: "fascinating-balkan",
    published: true,
    status: "interest_list",
    featured: false,
    order: 3,
    title: { en: "Fascinating Balkan", de: "Faszinierender Balkan" },
    countries: {
      en: "Hungary · Romania · Montenegro · Croatia · Austria",
      de: "Ungarn · Rumänien · Montenegro · Kroatien · Österreich",
    },
    tagline: {
      en: "Historic cities, mountain landscapes and the Adriatic coast, from Central Europe to the sea.",
      de: "Historische Städte, Bergwelten und die Adriaküste, von Mitteleuropa ans Meer.",
    },
    summary: {
      en: "A private jet journey through Central and Southeast Europe for six to eight guests, from Budapest and Transylvania to the Bay of Kotor, Istria and Salzburg.",
      de: "Eine Privatjet-Journey durch Mittel- und Südosteuropa für sechs bis acht Gäste, von Budapest und Transsilvanien über die Bucht von Kotor und Istrien bis Salzburg.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: { en: "Budapest to Budapest", de: "Budapest nach Budapest" },
    hotelCategory: hotels,
    route: ["Budapest", "Transylvania", "Bay of Kotor", "Istria", "Salzburg"],
    heroImage: {
      src: "/images/aircraft/pc12.jpg",
      alt: { en: "The Pilatus PC-12", de: "Die Pilatus PC-12" },
    },
    gallery,
    overview: {
      en: [
        "Fascinating Balkan connects a series of regions shaped by different histories, landscapes and cultural influences. The journey begins in Budapest before continuing into Transylvania, the Bay of Kotor, Istria and Salzburg and returning to the Hungarian capital.",
        "Private flights make it possible to move naturally between inland Europe, the Adriatic coast and the Alps while keeping the journey to eight nights. Historic cities, rural landscapes, locally rooted hotels, regional cuisine and time by the sea give each chapter its own character.",
        "Each departure is personally hosted by ABATON founder and private pilot Isabell Buchner.",
      ],
      de: [
        "Faszinierender Balkan verbindet eine Reihe von Regionen, geprägt von unterschiedlichen Geschichten, Landschaften und kulturellen Einflüssen. Die Journey beginnt in Budapest und führt weiter nach Transsilvanien, in die Bucht von Kotor, nach Istrien und Salzburg, bevor sie in die ungarische Hauptstadt zurückkehrt.",
        "Private Flüge machen es möglich, natürlich zwischen dem europäischen Binnenland, der Adriaküste und den Alpen zu wechseln und die Journey dennoch auf acht Nächte zu halten. Historische Städte, ländliche Landschaften, lokal verwurzelte Hotels, regionale Küche und Zeit am Meer geben jedem Kapitel seinen eigenen Charakter.",
        "Jede Abreise wird persönlich von ABATON-Gründerin und Privatpilotin Isabell Buchner begleitet.",
      ],
    },
    signatureMoments: [
      {
        title: { en: "Budapest", de: "Budapest" },
        description: {
          en: "Begin among the architecture, history and café culture of the Hungarian capital.",
          de: "Beginnen Sie zwischen Architektur, Geschichte und Kaffeehauskultur der ungarischen Hauptstadt.",
        },
      },
      {
        title: { en: "Transylvania", de: "Transsilvanien" },
        description: {
          en: "Explore a region of historic towns, mountain landscapes, castles and rural traditions.",
          de: "Erkunden Sie eine Region historischer Städtchen, Bergwelten, Schlösser und ländlicher Traditionen.",
        },
      },
      {
        title: { en: "Bay of Kotor", de: "Bucht von Kotor" },
        description: {
          en: "Spend two nights by the Adriatic, with time on the water and among the historic towns of the bay.",
          de: "Verbringen Sie zwei Nächte an der Adria, mit Zeit auf dem Wasser und in den historischen Orten der Bucht.",
        },
      },
      {
        title: { en: "Istria", de: "Istrien" },
        description: {
          en: "Discover a quieter side of Croatia through coastal towns, vineyards, olive oil, regional produce and local cuisine.",
          de: "Entdecken Sie eine stillere Seite Kroatiens durch Küstenorte, Weinberge, Olivenöl, regionale Erzeugnisse und lokale Küche.",
        },
      },
      {
        title: { en: "Salzburg", de: "Salzburg" },
        description: {
          en: "Finish the journey with Alpine surroundings, historic architecture and the cultural traditions of Salzburg.",
          de: "Beschließen Sie die Journey mit alpiner Umgebung, historischer Architektur und den kulturellen Traditionen Salzburgs.",
        },
      },
    ],
    itinerary: [
      {
        day: 1,
        city: "Budapest",
        title: { en: "Budapest", de: "Budapest" },
        description: {
          en: "Guests arrive individually in Budapest and settle into the first hotel. The group meets in the evening for a welcome dinner.",
          de: "Die Gäste reisen individuell in Budapest an und kommen im ersten Hotel an. Am Abend trifft sich die Gruppe zu einem Willkommensdinner.",
        },
      },
      {
        day: 2,
        city: "Budapest → Transylvania",
        title: {
          en: "Budapest to Transylvania",
          de: "Budapest nach Transsilvanien",
        },
        description: {
          en: "The first private flight takes the group east towards Transylvania. After arrival, a private transfer leads into the region and provides a first impression of its architecture, landscape and local traditions.",
          de: "Der erste Privatflug bringt die Gruppe ostwärts nach Transsilvanien. Nach der Ankunft führt ein privater Transfer in die Region und vermittelt einen ersten Eindruck ihrer Architektur, Landschaft und lokalen Traditionen.",
        },
      },
      {
        day: 3,
        city: "Transylvania",
        title: { en: "Transylvania", de: "Transsilvanien" },
        description: {
          en: "A full day is dedicated to the region. The programme may combine historic towns, castles, local culture and countryside, with time to enjoy the hotel and surroundings.",
          de: "Ein ganzer Tag gehört der Region. Das Programm kann historische Städtchen, Schlösser, lokale Kultur und Landschaft verbinden, mit Zeit, Hotel und Umgebung zu genießen.",
        },
      },
      {
        day: 4,
        city: "Transylvania → Bay of Kotor",
        title: {
          en: "Transylvania to the Bay of Kotor",
          de: "Transsilvanien in die Bucht von Kotor",
        },
        description: {
          en: "The journey turns south towards the Adriatic. After the private flight, the group continues to the Bay of Kotor, where mountain scenery meets the sea. The remainder of the afternoon follows a relaxed coastal rhythm.",
          de: "Die Journey wendet sich südwärts zur Adria. Nach dem Privatflug fährt die Gruppe weiter zur Bucht von Kotor, wo Bergkulisse auf das Meer trifft. Der restliche Nachmittag folgt einem entspannten Küstenrhythmus.",
        },
      },
      {
        day: 5,
        city: "Bay of Kotor",
        title: { en: "Bay of Kotor", de: "Bucht von Kotor" },
        description: {
          en: "The day explores the bay from both land and water. Historic towns, the coastline and selected regional experiences provide a closer understanding of Montenegro before the group comes together again for dinner.",
          de: "Der Tag erkundet die Bucht zu Land und zu Wasser. Historische Orte, die Küste und ausgewählte regionale Erlebnisse eröffnen ein näheres Verständnis Montenegros, bevor die Gruppe zum Dinner wieder zusammenkommt.",
        },
      },
      {
        day: 6,
        city: "Bay of Kotor → Istria",
        title: {
          en: "Bay of Kotor to Istria",
          de: "Bucht von Kotor nach Istrien",
        },
        description: {
          en: "A private flight follows the Adriatic coast north towards Istria. The afternoon introduces the region through its landscape, coastal towns and local food culture.",
          de: "Ein Privatflug folgt der Adriaküste nordwärts nach Istrien. Der Nachmittag führt in die Region ein, mit ihrer Landschaft, den Küstenorten und der lokalen Esskultur.",
        },
      },
      {
        day: 7,
        city: "Istria",
        title: { en: "Istria", de: "Istrien" },
        description: {
          en: "A full day is dedicated to the Istrian countryside and coast. The programme is shaped around regional producers, wine, olive oil, historic towns and time to enjoy the Mediterranean surroundings.",
          de: "Ein ganzer Tag gehört der istrischen Landschaft und Küste. Das Programm richtet sich nach regionalen Erzeugern, Wein, Olivenöl, historischen Städtchen und Zeit, die mediterrane Umgebung zu genießen.",
        },
      },
      {
        day: 8,
        city: "Istria → Salzburg",
        title: { en: "Istria to Salzburg", de: "Istrien nach Salzburg" },
        description: {
          en: "The journey continues by private jet towards the Alps. The final afternoon introduces Salzburg and its historic centre before a farewell dinner together.",
          de: "Die Journey führt per Privatjet weiter in die Alpen. Der letzte Nachmittag führt zu Salzburg und seiner historischen Altstadt, bevor ein gemeinsames Abschiedsdinner folgt.",
        },
      },
      {
        day: 9,
        city: "Salzburg → Budapest",
        title: { en: "Salzburg to Budapest", de: "Salzburg nach Budapest" },
        description: {
          en: "After breakfast, the final private flight returns the group to Budapest. Individual onward travel can continue after arrival.",
          de: "Nach dem Frühstück bringt der letzte Privatflug die Gruppe zurück nach Budapest. Die individuelle Weiterreise kann nach der Ankunft fortgesetzt werden.",
        },
      },
    ] as Day[],
    programmeNote: {
      en: "The itinerary describes the planned character and route of Fascinating Balkan. The departure date, hotels, restaurants, individual activities, timings and selected programme details are confirmed when the journey is released for reservations and according to availability, season and local conditions.",
      de: "Der Reiseverlauf beschreibt den geplanten Charakter und die Route von Faszinierender Balkan. Abreisedatum, Hotels, Restaurants, einzelne Aktivitäten, Zeiten und ausgewählte Programmdetails werden bestätigt, sobald die Journey für Reservierungen freigegeben ist, sowie nach Verfügbarkeit, Saison und örtlichen Bedingungen.",
    },
    stays: [
      {
        title: { en: "Budapest", de: "Budapest" },
        description: {
          en: "A refined city address in Budapest as the starting point of the journey.",
          de: "Ein kultiviertes Stadthaus in Budapest als Ausgangspunkt der Journey.",
        },
      },
      {
        title: { en: "Transylvania", de: "Transsilvanien" },
        description: {
          en: "A small retreat in Transylvania, close to the region's towns and mountain landscapes.",
          de: "Ein kleines Refugium in Transsilvanien, nah an den Städtchen und Bergwelten der Region.",
        },
      },
      {
        title: { en: "Bay of Kotor", de: "Bucht von Kotor" },
        description: {
          en: "A boutique property by the Bay of Kotor for two nights on the Adriatic.",
          de: "Ein Boutique-Haus an der Bucht von Kotor für zwei Nächte an der Adria.",
        },
      },
      {
        title: { en: "Istria", de: "Istrien" },
        description: {
          en: "An Istrian countryside hotel among vineyards, olive groves and coastal towns.",
          de: "Ein istrisches Landhotel zwischen Weinbergen, Olivenhainen und Küstenorten.",
        },
      },
      {
        title: { en: "Salzburg", de: "Salzburg" },
        description: {
          en: "A historic house in Salzburg for the final night, within reach of the old town.",
          de: "Ein historisches Haus in Salzburg für die letzte Nacht, in Reichweite der Altstadt.",
        },
      },
    ],
    inclusions: {
      en: [
        "8 nights in carefully selected hotels and character properties",
        "Private flights between the journey regions",
        "Private airport transfers and scheduled ground transportation",
        "Daily breakfast, and selected lunches and dinners",
        "Curated cultural, landscape and culinary experiences",
        "Personal hosting throughout the journey",
        "Pre-departure travel coordination",
        "Access to the private ABATON Circle after booking confirmation",
      ],
      de: [
        "8 Nächte in sorgfältig ausgewählten Hotels und Charakterhäusern",
        "Private Flüge zwischen den Regionen der Journey",
        "Private Flughafentransfers und Bodentransporte gemäß Programm",
        "Täglich Frühstück sowie ausgewählte Mittag- und Abendessen",
        "Kuratierte kulturelle, landschaftliche und kulinarische Erlebnisse",
        "Persönliche Begleitung während der gesamten Journey",
        "Reisekoordination vor der Abreise",
        "Zugang zum privaten ABATON Circle nach Buchungsbestätigung",
      ],
    },
    faq: [
      {
        question: {
          en: "Where will the journey begin and end?",
          de: "Wo wird die Journey beginnen und enden?",
        },
        answer: {
          en: "The journey is planned to begin and end in Budapest.",
          de: "Die Journey soll in Budapest beginnen und enden.",
        },
      },
      {
        question: {
          en: "When will reservations open?",
          de: "Wann werden Reservierungen geöffnet?",
        },
        answer: {
          en: "Guests on the Private Interest List receive priority information when the next departure is released.",
          de: "Gäste auf der privaten Interessentenliste erhalten vorrangig Informationen, sobald die nächste Abreise freigegeben wird.",
        },
      },
      {
        question: {
          en: "How active will the journey be?",
          de: "Wie aktiv wird die Journey sein?",
        },
        answer: {
          en: "The programme will combine cities, cultural visits, landscapes and time by the Adriatic. Selected activities will be adapted to the season and the interests of the group.",
          de: "Das Programm verbindet Städte, kulturelle Besuche, Landschaften und Zeit an der Adria. Ausgewählte Aktivitäten werden an Saison und Interessen der Gruppe angepasst.",
        },
      },
    ],
  },

  {
    // Route reworked per the final client document (section 3.1.4). Keeps
    // Copenhagen as the hub (this document supersedes the earlier Hamburg note).
    // Country list is Denmark, Norway, Finland only, the stray "Sweden" from the
    // old overview listing is deliberately not carried over.
    slug: "wild-scandinavia",
    published: true,
    status: "interest_list",
    featured: false,
    order: 4,
    title: { en: "Wild Scandinavia", de: "Wildes Skandinavien" },
    countries: {
      en: "Denmark · Norway · Finland",
      de: "Dänemark · Norwegen · Finnland",
    },
    tagline: {
      en: "Fjords, Arctic landscapes and Nordic traditions across Europe's far north.",
      de: "Fjorde, arktische Landschaften und nordische Traditionen im hohen Norden Europas.",
    },
    summary: {
      en: "A founder-hosted private jet journey through Denmark, Norway and Finland for six to eight guests, from Copenhagen and the Norwegian fjords to Northern Norway and Finnish Lapland.",
      de: "Eine vom Gründer begleitete Privatjet-Journey durch Dänemark, Norwegen und Finnland für sechs bis acht Gäste, von Kopenhagen und den norwegischen Fjorden bis Nordnorwegen und ins finnische Lappland.",
    },
    nights: 8,
    guestsLabel: guests,
    departureCity: {
      en: "Copenhagen to Copenhagen",
      de: "Kopenhagen nach Kopenhagen",
    },
    hotelCategory: hotels,
    route: [
      "Copenhagen",
      "Stavanger & the Fjords",
      "Ålesund & Sunnmøre",
      "Northern Norway",
      "Finnish Lapland",
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
        "Wild Scandinavia is a founder-hosted private jet journey through Denmark, Norway and Finland for just six to eight guests. The journey begins in Copenhagen before continuing to Norway's west coast, the fjords and mountains of Sunnmøre, Northern Norway and finally Finnish Lapland.",
        "Private flights connect regions separated by considerable distances and allow the journey to move naturally further north. Coastal landscapes and deep fjords gradually give way to the more remote scenery of the Arctic and the forests and open landscapes of Finnish Lapland.",
        "Days are shaped around nature, local traditions, regional cuisine and selected experiences, with time to enjoy the hotels, lodges and surroundings along the way. Each departure is personally hosted by ABATON founder and private pilot Isabell Buchner.",
      ],
      de: [
        "Wildes Skandinavien ist eine vom Gründer begleitete Privatjet-Journey durch Dänemark, Norwegen und Finnland für nur sechs bis acht Gäste. Die Journey beginnt in Kopenhagen und führt weiter an Norwegens Westküste, zu den Fjorden und Bergen von Sunnmøre, nach Nordnorwegen und schließlich ins finnische Lappland.",
        "Private Flüge verbinden Regionen, die durch große Distanzen getrennt sind, und lassen die Journey natürlich weiter nach Norden ziehen. Küstenlandschaften und tiefe Fjorde weichen allmählich der abgelegeneren Szenerie der Arktis und den Wäldern und weiten Landschaften des finnischen Lapplands.",
        "Die Tage folgen Natur, lokalen Traditionen, regionaler Küche und ausgewählten Erlebnissen, mit Zeit, Hotels, Lodges und Umgebung zu genießen. Jede Abreise wird persönlich von ABATON-Gründerin und Privatpilotin Isabell Buchner begleitet.",
      ],
    },
    signatureMoments: [
      {
        title: {
          en: "Stavanger & the Fjords",
          de: "Stavanger & die Fjorde",
        },
        description: {
          en: "Begin the Norwegian chapter among dramatic coastal landscapes, mountains and some of the country's best known fjords.",
          de: "Beginnen Sie das norwegische Kapitel zwischen dramatischen Küstenlandschaften, Bergen und einigen der bekanntesten Fjorde des Landes.",
        },
      },
      {
        title: { en: "Ålesund & Sunnmøre", de: "Ålesund & Sunnmøre" },
        description: {
          en: "Discover a region shaped by deep fjords, mountain scenery and small coastal communities, with time both on land and on the water.",
          de: "Entdecken Sie eine Region aus tiefen Fjorden, Bergkulissen und kleinen Küstenorten, mit Zeit zu Land und zu Wasser.",
        },
      },
      {
        title: { en: "Northern Norway", de: "Nordnorwegen" },
        description: {
          en: "Travel further north into a landscape of Arctic coastline, mountains and remote communities, with experiences shaped around the season and natural surroundings.",
          de: "Reisen Sie weiter nach Norden in eine Landschaft aus arktischer Küste, Bergen und abgelegenen Orten, mit Erlebnissen, die sich nach Saison und Natur richten.",
        },
      },
      {
        title: { en: "Finnish Lapland", de: "Finnisches Lappland" },
        description: {
          en: "Spend two nights surrounded by forests and open Arctic landscapes, with time for local culture, nature and the distinctive atmosphere of Lapland.",
          de: "Verbringen Sie zwei Nächte umgeben von Wäldern und weiten arktischen Landschaften, mit Zeit für lokale Kultur, Natur und die besondere Atmosphäre Lapplands.",
        },
      },
      {
        title: { en: "The Journey North", de: "Der Weg nach Norden" },
        description: {
          en: "Experience the changing character of Northern Europe as each private flight connects increasingly remote landscapes from Denmark to the Arctic.",
          de: "Erleben Sie den wechselnden Charakter Nordeuropas, während jeder Privatflug zunehmend abgelegene Landschaften von Dänemark bis in die Arktis verbindet.",
        },
      },
    ],
    itinerary: [
      {
        day: 1,
        city: "Copenhagen",
        title: { en: "Copenhagen", de: "Kopenhagen" },
        description: {
          en: "Guests arrive individually in Copenhagen and settle into the first hotel of the journey. In the evening, the ABATON group meets for the first time over a welcome dinner.",
          de: "Die Gäste reisen individuell in Kopenhagen an und kommen im ersten Hotel der Journey an. Am Abend trifft sich die ABATON-Gruppe zum ersten Mal bei einem Willkommensdinner.",
        },
      },
      {
        day: 2,
        city: "Copenhagen → Stavanger",
        title: {
          en: "Copenhagen to Stavanger",
          de: "Kopenhagen nach Stavanger",
        },
        description: {
          en: "After breakfast, a private transfer leads to the business aviation terminal for the first private flight of the journey. On arrival in Norway, the afternoon provides a first introduction to Stavanger and the surrounding coastal and fjord landscape. The evening is spent together over dinner.",
          de: "Nach dem Frühstück führt ein privater Transfer zum Business-Aviation-Terminal für den ersten Privatflug der Journey. Bei der Ankunft in Norwegen bringt der Nachmittag eine erste Annäherung an Stavanger und die umliegende Küsten- und Fjordlandschaft. Der Abend klingt bei einem gemeinsamen Dinner aus.",
        },
      },
      {
        day: 3,
        city: "Stavanger → Ålesund & Sunnmøre",
        title: {
          en: "Stavanger to Ålesund & Sunnmøre",
          de: "Stavanger nach Ålesund & Sunnmøre",
        },
        description: {
          en: "The morning leaves time for a final experience in the Stavanger region before the journey continues north by private jet. After arrival, a private transfer leads into the landscapes of Sunnmøre, where mountains and fjords define the next chapter of the journey. The remainder of the day is deliberately unhurried.",
          de: "Der Morgen lässt Zeit für ein letztes Erlebnis in der Region Stavanger, bevor die Journey per Privatjet weiter nach Norden führt. Nach der Ankunft führt ein privater Transfer in die Landschaften von Sunnmøre, wo Berge und Fjorde das nächste Kapitel bestimmen. Der restliche Tag bleibt bewusst unaufgeregt.",
        },
      },
      {
        day: 4,
        city: "Ålesund & Sunnmøre",
        title: { en: "Ålesund & Sunnmøre", de: "Ålesund & Sunnmøre" },
        description: {
          en: "A full day is dedicated to the landscapes of Sunnmøre. A privately arranged experience brings together some of the region's fjords, mountains and local character, with the final programme shaped around the season and conditions. There is also time to enjoy the hotel and surroundings at a slower pace.",
          de: "Ein ganzer Tag gehört den Landschaften von Sunnmøre. Ein privat arrangiertes Erlebnis verbindet einige der Fjorde, Berge und den lokalen Charakter der Region, das finale Programm richtet sich nach Saison und Bedingungen. Zudem bleibt Zeit, Hotel und Umgebung in Ruhe zu genießen.",
        },
      },
      {
        day: 5,
        city: "Sunnmøre → Northern Norway",
        title: {
          en: "Sunnmøre to Northern Norway",
          de: "Sunnmøre nach Nordnorwegen",
        },
        description: {
          en: "The journey continues north by private jet. On arrival in Northern Norway, the landscape becomes increasingly remote, with mountains, coastline and Arctic scenery setting a different rhythm for the next two nights. The afternoon is left for a first introduction to the surroundings and time at the hotel or lodge.",
          de: "Die Journey führt per Privatjet weiter nach Norden. Bei der Ankunft in Nordnorwegen wird die Landschaft zunehmend abgelegener, mit Bergen, Küste und arktischer Szenerie, die den nächsten zwei Nächten einen anderen Rhythmus geben. Der Nachmittag bleibt einer ersten Annäherung an die Umgebung und Zeit im Hotel oder in der Lodge.",
        },
      },
      {
        day: 6,
        city: "Northern Norway",
        title: { en: "Northern Norway", de: "Nordnorwegen" },
        description: {
          en: "A full day is dedicated to the landscapes and culture of Northern Norway. Selected private experiences are shaped around the season, local conditions and the interests of the group and may take place on land or water. The programme also allows time to enjoy the surroundings and the character of the property.",
          de: "Ein ganzer Tag gehört den Landschaften und der Kultur Nordnorwegens. Ausgewählte private Erlebnisse richten sich nach Saison, örtlichen Bedingungen und den Interessen der Gruppe und können zu Land oder zu Wasser stattfinden. Das Programm lässt zudem Zeit, die Umgebung und den Charakter des Hauses zu genießen.",
        },
      },
      {
        day: 7,
        city: "Northern Norway → Finnish Lapland",
        title: {
          en: "Northern Norway to Finnish Lapland",
          de: "Nordnorwegen ins finnische Lappland",
        },
        description: {
          en: "The private jet carries the group further east across the Arctic north into Finland. After arrival, a private transfer leads into Finnish Lapland, where forests, lakes and open landscapes create another change in atmosphere. The remainder of the day is spent settling into the surroundings.",
          de: "Der Privatjet bringt die Gruppe weiter ostwärts über den arktischen Norden nach Finnland. Nach der Ankunft führt ein privater Transfer ins finnische Lappland, wo Wälder, Seen und weite Landschaften erneut die Stimmung wandeln. Der restliche Tag gilt dem Ankommen in der Umgebung.",
        },
      },
      {
        day: 8,
        city: "Finnish Lapland",
        title: { en: "Finnish Lapland", de: "Finnisches Lappland" },
        description: {
          en: "The final full day is dedicated to Lapland. The programme combines nature, local traditions and selected privately arranged experiences according to the season and conditions. Time at the hotel or lodge forms an important part of the day before the group comes together for a final dinner.",
          de: "Der letzte volle Tag gehört Lappland. Das Programm verbindet Natur, lokale Traditionen und ausgewählte privat arrangierte Erlebnisse je nach Saison und Bedingungen. Zeit im Hotel oder in der Lodge ist ein wichtiger Teil des Tages, bevor die Gruppe zu einem letzten Dinner zusammenkommt.",
        },
      },
      {
        day: 9,
        city: "Finnish Lapland → Copenhagen",
        title: {
          en: "Finnish Lapland to Copenhagen",
          de: "Finnisches Lappland nach Kopenhagen",
        },
        description: {
          en: "After breakfast, the final private flight returns the group to Copenhagen. The journey ends on arrival, with individual onward travel continuing from Copenhagen.",
          de: "Nach dem Frühstück bringt der letzte Privatflug die Gruppe zurück nach Kopenhagen. Die Journey endet mit der Ankunft, die individuelle Weiterreise wird von Kopenhagen aus fortgesetzt.",
        },
      },
    ] as Day[],
    programmeNote: {
      en: "The itinerary describes the planned character and route of Wild Scandinavia. The specific destinations within Northern Norway and Finnish Lapland, as well as hotels, lodges, restaurants, individual activities, timings and selected programme details, are finalised when the journey is released for reservations and according to season, availability, weather and local conditions.",
      de: "Der Reiseverlauf beschreibt den geplanten Charakter und die Route von Wildes Skandinavien. Die genauen Ziele in Nordnorwegen und im finnischen Lappland sowie Hotels, Lodges, Restaurants, einzelne Aktivitäten, Zeiten und ausgewählte Programmdetails werden festgelegt, sobald die Journey für Reservierungen freigegeben ist, sowie nach Saison, Verfügbarkeit, Wetter und örtlichen Bedingungen.",
    },
    stays: [
      {
        title: { en: "Copenhagen", de: "Kopenhagen" },
        description: {
          en: "A refined city hotel in Copenhagen as the graceful gateway to the North.",
          de: "Ein kultiviertes Stadthotel in Kopenhagen als anmutiges Tor zum Norden.",
        },
      },
      {
        title: { en: "Stavanger & the Fjords", de: "Stavanger & die Fjorde" },
        description: {
          en: "A characterful property on Norway's west coast, close to the fjords and the sea.",
          de: "Ein charaktervolles Haus an Norwegens Westküste, nah an Fjorden und Meer.",
        },
      },
      {
        title: { en: "Ålesund & Sunnmøre", de: "Ålesund & Sunnmøre" },
        description: {
          en: "A locally rooted hotel among the mountains and fjords of Sunnmøre.",
          de: "Ein lokal verwurzeltes Hotel zwischen den Bergen und Fjorden von Sunnmøre.",
        },
      },
      {
        title: { en: "Northern Norway", de: "Nordnorwegen" },
        description: {
          en: "A retreat in the Arctic north, where location and the landscape matter as much as the classification.",
          de: "Ein Refugium im arktischen Norden, wo Lage und Landschaft ebenso zählen wie die Klassifizierung.",
        },
      },
      {
        title: { en: "Finnish Lapland", de: "Finnisches Lappland" },
        description: {
          en: "A lodge among the forests and open landscapes of Finnish Lapland for the final two nights.",
          de: "Eine Lodge zwischen den Wäldern und weiten Landschaften des finnischen Lapplands für die letzten zwei Nächte.",
        },
      },
    ],
    inclusions: {
      en: [
        "8 nights in carefully selected hotels, lodges and character properties",
        "Private flights between the journey regions according to the final itinerary",
        "Private airport transfers and scheduled ground transportation during the journey",
        "Daily breakfast, and selected lunches and dinners according to the final programme",
        "Curated landscape, cultural and culinary experiences",
        "Personal hosting throughout the journey",
        "Pre-departure travel coordination",
        "Access to the private ABATON Circle after booking confirmation",
      ],
      de: [
        "8 Nächte in sorgfältig ausgewählten Hotels, Lodges und Charakterhäusern",
        "Private Flüge zwischen den Regionen der Journey gemäß dem finalen Reiseverlauf",
        "Private Flughafentransfers und Bodentransporte gemäß Programm während der Journey",
        "Täglich Frühstück sowie ausgewählte Mittag- und Abendessen gemäß dem finalen Programm",
        "Kuratierte landschaftliche, kulturelle und kulinarische Erlebnisse",
        "Persönliche Begleitung während der gesamten Journey",
        "Reisekoordination vor der Abreise",
        "Zugang zum privaten ABATON Circle nach Buchungsbestätigung",
      ],
    },
    faq: [
      {
        question: {
          en: "Where will Wild Scandinavia begin and end?",
          de: "Wo wird Wildes Skandinavien beginnen und enden?",
        },
        answer: {
          en: "The journey is planned to begin and end in Copenhagen. Guests arrange their individual international travel to and from Copenhagen.",
          de: "Die Journey soll in Kopenhagen beginnen und enden. Die Gäste organisieren ihre individuelle internationale An- und Abreise nach und von Kopenhagen selbst.",
        },
      },
      {
        question: {
          en: "Which regions will be included?",
          de: "Welche Regionen sind enthalten?",
        },
        answer: {
          en: "The planned route connects Copenhagen with Stavanger, Sunnmøre, Northern Norway and Finnish Lapland. The specific locations within Northern Norway and Finnish Lapland are confirmed with the final journey programme.",
          de: "Die geplante Route verbindet Kopenhagen mit Stavanger, Sunnmøre, Nordnorwegen und dem finnischen Lappland. Die genauen Orte in Nordnorwegen und im finnischen Lappland werden mit dem finalen Reiseprogramm bestätigt.",
        },
      },
      {
        question: {
          en: "When will Wild Scandinavia take place?",
          de: "Wann wird Wildes Skandinavien stattfinden?",
        },
        answer: {
          en: "The departure date has not yet been released. Guests on the Private Interest List receive priority information when reservations are prepared to open.",
          de: "Das Abreisedatum ist noch nicht freigegeben. Gäste auf der privaten Interessentenliste erhalten vorrangig Informationen, sobald Reservierungen geöffnet werden.",
        },
      },
      {
        question: {
          en: "How active will the journey be?",
          de: "Wie aktiv wird die Journey sein?",
        },
        answer: {
          en: "Wild Scandinavia combines landscape based experiences, local culture and time outdoors with regular periods at the hotels and lodges. Selected activities are adapted to the season, conditions and interests of the group.",
          de: "Wildes Skandinavien verbindet landschaftliche Erlebnisse, lokale Kultur und Zeit im Freien mit regelmäßigen Aufenthalten in den Hotels und Lodges. Ausgewählte Aktivitäten werden an Saison, Bedingungen und Interessen der Gruppe angepasst.",
        },
      },
      {
        question: {
          en: "What happens if weather affects an activity?",
          de: "Was geschieht, wenn das Wetter eine Aktivität beeinträchtigt?",
        },
        answer: {
          en: "The programme in Northern Europe is designed with seasonal and weather conditions in mind. Individual experiences may be adjusted where necessary while maintaining the overall character of the journey.",
          de: "Das Programm in Nordeuropa berücksichtigt saisonale und Wetterbedingungen. Einzelne Erlebnisse können bei Bedarf angepasst werden, während der Gesamtcharakter der Journey erhalten bleibt.",
        },
      },
    ],
  },
];
