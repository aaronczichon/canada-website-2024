import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import deLocale from "@fullcalendar/core/locales/de";
import enLocale from "@fullcalendar/core/locales/en-gb";

export default function Calendar() {
  const locale = window.navigator.language || window.navigator.userLanguage;
  const loc = locale.split("-")[0];
  const lang = loc === "de" ? deLocale : enLocale;
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={lang}
    />
  );
}
