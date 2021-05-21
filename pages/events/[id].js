import { useRouter } from 'next/router';

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

//import { getEventById } from '../../dummy-data';
import { getEventById, getAllEvents } from '../../helpers/api-util.js';

const EventDetailPage = (props) => {
    //const router = useRouter();
    const selectedEvent = props.selectedEvent;

    //const eventId = router.query.id;
    //const selectedEvent = getEventById(eventId);

    if(!selectedEvent){
        return (
            <ErrorAlert>
                <p>No event found</p>
            </ErrorAlert>
        )
    }

    return(
        <>
            <EventSummary title={ selectedEvent.title }/>
            <EventLogistics date={ selectedEvent.date } address={ selectedEvent.location }
                image={ selectedEvent.image } imageAlt={ selectedEvent.title }/>
            <EventContent>
                <p>{ selectedEvent.description }</p>
            </EventContent>
        </>
    )
}

export async function getStaticProps(context){
    const eventId = context.params.id;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent : event
        }
    }
}

export async function getStaticPaths(){
    const events = await getAllEvents();
    const eventPaths = events.map(event => ({ params: { id: event.id } }));

    return {
        paths: eventPaths,
        fallback: false,
    }
}

export default EventDetailPage;