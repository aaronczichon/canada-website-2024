import type { MultiMapProps } from "../components/dynamic/MultiMap";

export const VisitingLocations: MultiMapProps = {
  mapCenter: [-64.85750773761266, 44.5570764745086],
  zoom: 7.5,
  points: [
    {
      id: "01-halifax",
      color: "#CA2B2B",
      coordinates: [-63.582687, 44.65107],
      tooltip: "Unser aktueller Standort in Halifax",
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
  ],
};
