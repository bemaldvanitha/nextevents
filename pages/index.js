import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util.js';
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
    return(
        <>
            <Head>
                <title>NextEvents</title>
                <meta name={'description'} content={'find events'}/>
            </Head>
            <NewsletterRegistration/>
            <EventList events={props.events}/>
        </>
    )
}

export async function getStaticProps(context){
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800
    }
}

export default HomePage;