import { getFeaturedEvents } from '../dummy-data';

import EventList from "../components/events/event-list";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();

    return(
        <EventList events={featuredEvents}/>
    )
}

export default HomePage;