import { useRouter } from 'next/router';

import { getAllEvents } from '../../dummy-data';

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEventsPage = () => {
    const router = useRouter();
    const events = getAllEvents();

    const findEventsHandler = (year, month) => {
        const path = `/events/${year}/${month}`;
        router.push(path);
    }

    return(
        <>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList events={events}/>
        </>
    )
}

export default AllEventsPage;