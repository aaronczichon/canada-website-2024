import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import deLocale from '@fullcalendar/core/locales/de';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { AccomonationLocations } from '../../content/visiting-locations';

export default function Calendar() {
	const locale = window.navigator.language || window.navigator.userLanguage;
	const loc = locale.split('-')[0];
	const lang = loc === 'de' ? deLocale : enLocale;
	const events = AccomonationLocations.map((event) => ({
		...event,
		backgroundColor: '#b33335',
		allDay: true,
	}));
	return (
		<FullCalendar
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			locale={lang}
			events={events}
		/>
	);
}
