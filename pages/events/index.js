import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
// import { getAllEvents } from '../../dummy-data';

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEventsPage = (props) => {
    const router = useRouter();
    const events = props.events;

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

export async function getStaticProps(context){
   const allEvents = await getAllEvents();

   return {
       props: {
           events: allEvents
       },
       revalidate: 600
   }
}

export default AllEventsPage;