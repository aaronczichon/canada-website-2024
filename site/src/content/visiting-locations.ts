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
      color: "#2BCA2B",
      coordinates: [-52.80236599857151, 47.54517983063546],
      tooltip: `Das hier ist der zweite Ort in St. John\'s wo wir vom 04. - 12.07.24 wohnen. <a href="https://www.vrbo.com/9946612ha" target="_blank">Die Unterkunft gibt es auf Vrbo.</a><br/>
        Übernachtung vom: 30.06.24 - 04.07.24
        `,
      useRadius: true,
    },
  ],
};
