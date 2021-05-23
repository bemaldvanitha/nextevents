import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

import { getEventById, getFeaturedEvents } from '../../helpers/api-util.js';

const EventDetailPage = (props) => {
    const selectedEvent = props.selectedEvent;

    if(!selectedEvent){
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <>
            <Head>
                <title>{ selectedEvent.title }</title>
                <meta name={'description'} content={ selectedEvent.description }/>
            </Head>
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
        },
        revalidate: 60
    }
}

export async function getStaticPaths(){
    const events = await getFeaturedEvents();
    const eventPaths = events.map(event => ({ params: { id: event.id } }));

    return {
        paths: eventPaths,
        fallback: true,
    }
}

export default EventDetailPage;