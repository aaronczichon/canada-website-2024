import type { MultiMapProps } from "../components/dynamic/MultiMap";

export const VisitingLocations: MultiMapProps = {
  mapCenter: [-59.03460634364587, 47.28165248503039],
  zoom: 5.5,
  points: [
    {
      id: "01-halifax",
      color: "#CA2B2B",
      coordinates: [-63.582687, 44.65107],
      tooltip: "Unser erster Aufenthalt in Halifax",
      useRadius: true,
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
      useRadius: true,
    },
    {
      id: "05-rocky-harbour",
      color: "#CA2B2B",
      coordinates: [-57.91144751936399, 49.58702542228375],
      tooltip: "Übernachtung vom 23.05. bis 24.05. in Rocky Harbour",
      useRadius: false,
    },
    {
      id: "06-tuckamore-lodge",
      color: "#CA2B2B",
      coordinates: [-56.002661271872746, 51.161643316865565],
      tooltip: "Übernachtung vom 24.05. bis 25.05. in der Tuckamore Lodge",
      useRadius: false,
    },
  ],
};
