// Journey: Finest of Europe (full itinerary)
// Content-as-code. Add a new file like this and register it in ./index.ts.
// Data reflects the ABATON 2026 brochure (route, inclusions, "from" pricing).
//
// ! OPEN DECISION 1.4: section 13 of docs/SPEC.md flags this route for REMOVAL
// (too generically "reachable by everyone", not aligned with the new
// positioning) and notes the duplicate "Founders Edition" naming. It is
// nonetheless the featured homepage journey (`featured: true` below), while
// section 6 of the spec wants Elegant Islands in that slot. Do not delete or
// re-point this without Isabell's decision: legacy URLs 301 here
// (src/lib/legacy-redirects.ts) and the homepage hero depends on it.

const journey = {
  slug: "finest-of-europe",
  published: true,
  featured: true,
  order: 1,

  title: {
    en: "Finest of Europe",
    de: "Das Feinste Europas",
  },
  tagline: {
    en: "Europe's must-see capitals, one private sky.",
    de: "Europas Must-see-Metropolen, ein privater Himmel.",
  },
  summary: {
    en: "The metropolitan journey through Europe's must-see capitals, connected seamlessly by private jet. Vienna, Venice, Rome and Paris meet the Côte d'Azur with Cannes and Monaco, with curated access, refined hotels and dining for a small circle.",
    de: "Die Metropolen-Journey durch Europas Must-see-Hauptstädte, nahtlos per Privatjet verbunden. Wien, Venedig, Rom und Paris treffen auf die Côte d'Azur mit Cannes und Monaco, mit kuratierten Zugängen, feinen Hotels und Dining für einen kleinen Kreis.",
  },

  nights: 8,
  guestsLabel: { en: "6–10 guests", de: "6–10 Gäste" },
  departureCity: { en: "Munich", de: "München" },
  hotelCategory: {
    en: "4★ and 5★ luxury hotels",
    de: "4★- und 5★-Luxushotels",
  },
  priceFrom: 29980,
  priceFromSingle: 33880,
  nextDeparture: {
    en: "11–19 September 2026",
    de: "11.–19. September 2026",
  },

  route: [
    "Munich",
    "Vienna",
    "Venice",
    "Rome",
    "Cannes & Monaco",
    "Paris",
    "Munich",
  ],

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
      "Finest of Europe leads through the cultural heart of the continent, shaped by history, craftsmanship and quiet elegance. It begins in Munich, where a shared welcome dinner brings the group together and sets a relaxed, confident tone for the days ahead.",
      "Every leg is flown privately, so the distance between one remarkable place and the next is measured in comfort, not compromise. Eight nights unfold in hand-selected, mostly owner-led hotels, around authentic tables and private access arranged for our small circle of guests.",
    ],
    de: [
      "Das Feinste Europas führt durch das kulturelle Herz des Kontinents, geprägt von Geschichte, Handwerkskunst und leiser Eleganz. Es beginnt in München, wo ein gemeinsames Willkommensdinner die Gruppe zusammenbringt und einen entspannten, souveränen Ton für die kommenden Tage setzt.",
      "Jede Etappe wird privat geflogen, so bemisst sich die Distanz zwischen einem besonderen Ort und dem nächsten in Komfort, nicht in Kompromissen. Acht Nächte entfalten sich in handverlesenen, meist inhabergeführten Hotels, um authentische Tische und private Zugänge für unseren kleinen Kreis.",
    ],
  },

  itinerary: [
    {
      day: 1,
      city: "Munich",
      title: {
        en: "Arrival & Welcome Dinner",
        de: "Ankunft & Willkommensdinner",
      },
      description: {
        en: "We gather in Munich, a city where tradition and modern life coexist naturally. A shared welcome dinner brings the group together and sets the tone for the days ahead.",
        de: "Wir versammeln uns in München, einer Stadt, in der Tradition und modernes Leben selbstverständlich nebeneinander bestehen. Ein gemeinsames Willkommensdinner bringt die Gruppe zusammen und stimmt auf die kommenden Tage ein.",
      },
    },
    {
      day: 2,
      city: "Munich → Vienna",
      title: { en: "Imperial Vienna", de: "Imperiales Wien" },
      description: {
        en: "We fly privately to Vienna, where imperial history is still part of everyday life. A private carriage ride offers a different perspective on the city, followed by a behind-the-scenes visit to the State Opera.",
        de: "Wir fliegen privat nach Wien, wo imperiale Geschichte noch immer Teil des Alltags ist. Eine private Kutschfahrt eröffnet eine andere Perspektive auf die Stadt, gefolgt von einem Blick hinter die Kulissen der Staatsoper.",
      },
    },
    {
      day: 3,
      city: "Vienna → Venice",
      title: { en: "Canals & Palazzi", de: "Kanäle & Palazzi" },
      description: {
        en: "A short private flight carries us to Venice, explored by private boat and on foot, moving beyond the familiar routes into quieter squares, historic palazzi and layers of past centuries.",
        de: "Ein kurzer Privatflug bringt uns nach Venedig, erkundet per privatem Boot und zu Fuß, abseits der bekannten Wege, hinein in stillere Plätze, historische Palazzi und die Schichten vergangener Jahrhunderte.",
      },
    },
    {
      day: 4,
      city: "Venice → Rome",
      title: { en: "The Eternal City", de: "Die Ewige Stadt" },
      description: {
        en: "We continue south to Rome. A guided city tour traces antiquity and Renaissance alike, before an evening at leisure in the Eternal City.",
        de: "Wir reisen südwärts nach Rom. Eine geführte Stadttour zeichnet Antike wie Renaissance nach, bevor ein Abend zur freien Verfügung in der Ewigen Stadt folgt.",
      },
    },
    {
      day: 5,
      city: "Rome",
      title: { en: "Rome in Depth", de: "Rom in der Tiefe" },
      description: {
        en: "Rome is given the time it deserves. A second night lets the city unfold gradually, from ancient ruins to Renaissance architecture, closing with a private dinner in a historic palazzo.",
        de: "Rom bekommt die Zeit, die es verdient. Eine zweite Nacht lässt die Stadt sich langsam entfalten, von antiken Ruinen bis zur Renaissance-Architektur, mit einem privaten Dinner in einem historischen Palazzo zum Abschluss.",
      },
    },
    {
      day: 6,
      city: "Rome → Cannes",
      title: { en: "Riviera Rhythms", de: "Rhythmen der Riviera" },
      description: {
        en: "The journey continues along the French Riviera, where light, landscape and lifestyle define the rhythm. In Cannes, a visit to a small vineyard introduces local wines and Provençal character.",
        de: "Die Journey führt weiter entlang der Französischen Riviera, wo Licht, Landschaft und Lebensart den Rhythmus bestimmen. In Cannes führt der Besuch eines kleinen Weinguts zu lokalen Weinen und provenzalischem Charakter.",
      },
    },
    {
      day: 7,
      city: "Cannes → Monaco",
      title: { en: "Monte Carlo & the Coast", de: "Monte Carlo & die Küste" },
      description: {
        en: "On to Monaco for coastal views and understated elegance, with a sports car ride through Monte Carlo and a private boat tour along the principality's shore.",
        de: "Weiter nach Monaco, zu Küstenblicken und zurückhaltender Eleganz, mit einer Sportwagenfahrt durch Monte Carlo und einer privaten Bootstour entlang der Küste des Fürstentums.",
      },
    },
    {
      day: 8,
      city: "Monaco → Paris",
      title: { en: "The Elegance of Paris", de: "Die Eleganz von Paris" },
      description: {
        en: "A final flight north to Paris. The journey concludes with a private guided visit to the Louvre and a farewell dinner overlooking the city from the Eiffel Tower, a quiet and memorable closing moment.",
        de: "Ein letzter Flug nordwärts nach Paris. Die Journey schließt mit einem privat geführten Besuch des Louvre und einem Abschiedsdinner mit Blick über die Stadt vom Eiffelturm, ein stiller und unvergesslicher Abschluss.",
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
      "Private jet travel throughout",
      "Luxury ground transport with private chauffeurs",
      "8 nights in 4★S/5★ hotels including breakfast",
      "8 dinners and 7 lunches",
      "Private carriage ride in Vienna",
      "Behind-the-scenes Vienna State Opera tour",
      "Private boat ride in Venice",
      "Guided city tour of Rome",
      "Wine tasting in Cannes",
      "Sports car ride in Monte Carlo",
      "Private boat tour to Monaco",
      "VIP tour of the Louvre in Paris",
    ],
    de: [
      "Privatjet-Flüge während der gesamten Journey",
      "Luxuriöse Bodentransporte mit privaten Chauffeuren",
      "8 Nächte in 4★S-/5★-Hotels inklusive Frühstück",
      "8 Abendessen und 7 Mittagessen",
      "Private Kutschfahrt in Wien",
      "Führung hinter den Kulissen der Wiener Staatsoper",
      "Private Bootsfahrt in Venedig",
      "Geführte Stadttour durch Rom",
      "Weinverkostung in Cannes",
      "Sportwagenfahrt in Monte Carlo",
      "Private Bootstour nach Monaco",
      "VIP-Tour durch den Louvre in Paris",
    ],
  },
} as const;

export default journey;
