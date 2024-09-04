import type { EventInput } from "@fullcalendar/core";
import type { MultiMapProps } from "../components/dynamic/MultiMap";

export const VisitingLocations: MultiMapProps = {
  mapCenter: [-82.03460634364587, 47.28165248503039],
  zoom: 4,
  points: [
    {
      id: "01-halifax",
      color: "#CA2B2B",
      coordinates: [-63.582687, 44.65107],
      tooltip: "Unser erster Aufenthalt in Halifax",
      useRadius: false,
    },
    {
      id: "02-eastern",
      color: "#CA2B2B",
      coordinates: [-66.13039708832629, 44.053421632099365],
      tooltip: `Hier haben wir das Osterwochenende vom 28.03. bis 01.04. verbracht um den Süden von Nova Scotia zu erkunden.<br/>
        Die Beiträge dazu findest du hier:
        <ul>
        <li><a href="/blog/07-kejimkujik/">Osterwochenende - Teil 1</a></li>
        <li><a href="/blog/06-eastern-part-2/">Osterwochenende - Teil 2</a></li>
        <li><a href="/blog/05-good-friday/">Osterwochenende - Teil 3</a></li>
        </ul>
        `,
      useRadius: false,
    },
    {
      id: "03-cape-breton",
      color: "#CA2B2B",
      coordinates: [-61.0604, 46.53136],
      tooltip: "Übernachtung in Cape Breton auf dem Weg nach Newfoundland",
      useRadius: false,
    },
    {
      id: "04-brighton",
      color: "#CA2B2B",
      coordinates: [-55.63716810349037, 49.547550234959],
      tooltip: "Unser aktueller Standort in Brighton",
      useRadius: false,
    },
    {
      id: "05-rocky-harbour",
      color: "#CA2B2B",
      coordinates: [-57.91144751936399, 49.58702542228375],
      tooltip:
        'Übernachtung vom 23.05. bis 24.05. in <a href="https://www.airbnb.com/slink/uA7Wk7tw" target="_blank">Rocky Harbour</a>',
      useRadius: false,
    },
    {
      id: "06-tuckamore-lodge",
      color: "#CA2B2B",
      coordinates: [-56.002661271872746, 51.161643316865565],
      tooltip:
        'Übernachtung vom 24.05. bis 25.05. in der <a href="https://www.booking.com/hotel/ca/tuckamore-lodge.en-gb.html" target="_blank">Tuckamore Lodge</a>',
      useRadius: false,
    },
    {
      id: "07-memorial-university",
      color: "#CA2B2B",
      coordinates: [-52.72918397026897, 47.57416405387091],
      tooltip:
        'Nachdem wir wieder aus Deutschland im Juni zurückgekommen sind, haben wir in der <a href="https://www.booking.com/hotel/ca/memorial-university.en-gb.html" target="_blank">Memorial University</a> in St. John\'s übernachtet.',
      useRadius: false,
    },
    {
      id: "08-trinity",
      color: "#CA2B2B",
      coordinates: [-53.29830279178249, 48.38321063514056],
      tooltip: `Bevor wir nach St. John\'s angekommen sind haben wir noch eine Nacht in dieser <a href="https://www.airbnb.com/rooms/1145817192206759434" target="_blank">tollen Cabin am Pier</a> übernachtet. <br/>
        Übernachtung vom: 29.06.24 - 30.06.24
        `,
      useRadius: false,
    },
    {
      id: "08-st-johns-1",
      color: "#CA2B2B",
      coordinates: [-52.80415872631422, 47.55815938901318],
      tooltip: `Unsere Zeit in St. John\'s ist auf zwei unterschiedliche Locations im gleichen Wohngebiet gesplittet. <a href="https://www.airbnb.com/rooms/1136278925339190001" target="_blank">Diese Unterkunft</a> ist die erste mit einem richtigen Arbeitsplatz und einem guten Bürostuhl. Dafür gibts Sonderpunkte! <br/>
        Übernachtung vom: 30.06.24 - 04.07.24
        `,
      useRadius: false,
    },
    {
      id: "09-st-johns-2",
      color: "#CA2B2B",
      coordinates: [-52.80236599857151, 47.54517983063546],
      tooltip: `Das hier ist der zweite Ort in St. John\'s wo wir vom 04. - 12.07.24 wohnen. <a href="https://www.vrbo.com/9946612ha" target="_blank">Die Unterkunft gibt es auf Vrbo.</a><br/>
        Übernachtung vom: 30.06.24 - 04.07.24
        `,
      useRadius: false,
    },
    {
      id: "10-arnolds-cove",
      color: "#CA2B2B",
      coordinates: [-53.99375773111821, 47.766704436433145],
      tooltip: `Nach St. John's wollten wir noch etwas von der Avalon sehen. Daher sind wir nach <a href="https://www.airbnb.ca/rooms/1126786250486159230" target="_blank">Arnold's Cove</a> gefahren und haben dort in der übernachtet.`,
      useRadius: false,
    },
    {
      id: "11-marystown",
      color: "#CA2B2B",
      coordinates: [-55.15953719709933, 47.156183140788464],
      tooltip: `Da wir einen Tag nach Saint Pierre fahren wollen, übernachten wir in <a href="https://www.airbnb.ca/rooms/52796302" target="_blank">Marystown</a> damit es nicht so weit bis zur Fähre ist.`,
      useRadius: false,
    },
    {
      id: "12-halifax-2",
      color: "#CA2B2B",
      coordinates: [-63.57781184808878, 44.63413236723511],
      tooltip: `Bevor es weiter nach Montréal geht, übernachten wir nochmal in Halifax.`,
      useRadius: false,
    },
    {
      id: "13-montreal",
      color: "#CA2B2B",
      coordinates: [-73.55810992624419, 45.50230708990301],
      tooltip: `Wir sind in Montréal! Dort verbringen wir in <a href="https://www.airbnb.ca/rooms/25973705" target="_blank">Old Montréal</a> die nächsten Wochen. Genauer gesagt bis zum 18. August.`,
      useRadius: false,
    },
    {
      id: "14-missauga",
      color: "#CA2B2B",
      coordinates: [-79.65052280832177, 43.725835731374936],
      tooltip: `Kurzer Zwischenstopp in Toronto / Missauga bevor es weiter nach Winnipeg geht!`,
      useRadius: false,
    },
    {
      id: "15-winnipeg",
      color: "#CA2B2B",
      coordinates: [-97.13568555374694, 49.89888395397797],
      tooltip: `In Winnipeg verbringen wir <a href="https://www.airbnb.ca/rooms/961167602241646280" target="_blank">3 Tage</a> bevor es uns dann auf einen Roadtrip in Richtung Calgary zieht.`,
      useRadius: false,
    },
    {
      id: "16-hargraves",
      color: "#CA2B2B",
      coordinates: [-101.06622625234651, 49.91173766014226],
      tooltip: `Auf unserem Weg durch Manitoba übernachten wir in <a href="https://www.airbnb.ca/rooms/12154453" target="_blank">Hargraves</a>.`,
      useRadius: false,
    },
    {
      id: "17-strongfield",
      color: "#CA2B2B",
      coordinates: [-106.59857680406616, 51.3311102920845],
      tooltip: `In Saskatchewan machen wir Zwischenstopp in einer <a href="https://www.airbnb.ca/rooms/1080566936021756392" target="_blank">alten Kirche in Strongfield</a>.`,
      useRadius: false,
    },
    {
      id: "18-saskatoon",
      color: "#CA2B2B",
      coordinates: [-106.65994534083336, 52.11116435116523],
      tooltip: `Eine wunderbare Zeit hatten wir in <a href="https://www.airbnb.ca/rooms/1101422160447847095" target="_blank">Saskatoon</a>. Die Stadt kann man wirklich empfehlen!`,
      useRadius: false,
    },
    {
      id: "19-netherhill",
      color: "#CA2B2B",
      coordinates: [-108.98041546471184, 51.552719321249825],
      tooltip: `Um den Urlaub ausklingen zu lassen und eine nicht zu lange Strecke bis nach Calgary zu haben, übernachteten wir <a href="https://www.airbnb.ca/rooms/1176280982350288476" target="_blank">in einer kleine Off-the-grid Cabin</a>.`,
      useRadius: false,
    },
    {
      id: "20-calgary",
      color: "#2BCA2B",
      coordinates: [-113.99561613935663, 51.04370427769504],
      tooltip: `Wir sind nun in Calgary angekommen. Hier bleiben wir von September bis Ende November.`,
      useRadius: true,
    },
  ],
  currentPath:
    "https://directus.aaronczichon.de/assets/09c0fa7d-00aa-4117-9326-1a6eafd445b1.gpx",
  tooltip: "Das ist unsere bisherige Route zum Stand von 02.09.2024",
};

export const AccomonationLocations: EventInput[] = [
  {
    id: "01-halifax",
    title: "Halifax, Nova Scotia",
    start: "2024-03-01",
    end: "2024-04-29",
  },
  {
    id: "02-to-nl",
    title: "Nova Scotia -> Newfoundland",
    start: "2024-04-29",
    end: "2024-05-01",
  },
  {
    id: "03-brighton",
    title: "Brighton, Newfoundland",
    start: "2024-05-01",
    end: "2024-06-29",
  },
  {
    id: "04-trinity",
    title: "Trinity, Newfoundland",
    start: "2024-06-29",
    end: "2024-06-30",
  },
  {
    id: "05-stjohns",
    title: "St. John's, Newfoundland",
    start: "2024-06-30",
    end: "2024-07-12",
  },
  {
    id: "06-arnolds-cove",
    title: "Arnold`s Cove, Newfoundland",
    start: "2024-07-12",
    end: "2024-07-15",
  },
  {
    id: "07-marystown",
    title: "Marystown, Newfoundland",
    start: "2024-07-15",
    end: "2024-07-18",
  },
  {
    id: "08-nl-to-ns",
    title: "Newfoundland -> Nova Scotia",
    start: "2024-07-18",
    end: "2024-07-21",
  },
  {
    id: "09-halifax",
    title: "Halifax, Nova Scotia",
    start: "2024-07-21",
    end: "2024-07-24",
  },
  {
    id: "10-train",
    title: "Nova Scotia -> Quebec",
    start: "2024-07-24",
    end: "2024-07-25",
  },
  {
    id: "11-montreal",
    title: "Montreal, Quebec",
    start: "2024-07-25",
    end: "2024-08-18",
  },
  {
    id: "12-camping",
    title: "<Travel / Holidays>",
    start: "2024-08-18",
    end: "2024-09-01",
  },
  {
    id: "13-calgary",
    title: "Calgary, Alberta",
    start: "2024-09-01",
    end: "2024-11-30",
  },
  {
    id: "13a-whitehorse",
    title: "Whitehorse, Yukon",
    start: "2024-10-07",
    end: "2024-10-20",
  },
];
