import Head from "next/head";

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (props) => {

    if(props.hasError){
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = props.events;

    if(!filteredEvents || filteredEvents.length === 0){
        return (
            <>
                <ErrorAlert>
                    <p>No events found</p>
                </ErrorAlert>
                <div className={'center'}>
                    <Button link={'/events'}>Show All events</Button>
                </div>
            </>
        )
    }

    const date = new Date(props.date.year, props.date.month - 1 );

    return(
        <>
            <Head>
                <title>Filtered Events</title>
                <meta name={'description'} content={`All events for chosen date`}/>
            </Head>
            <ResultsTitle date={date}/>
            <EventList events={filteredEvents}/>
        </>
    )
}

export async function getServerSideProps(context){
    const { params } = context;

    const filterData = params.date;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
        return {
            props: {
                hasError: true
            }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}

export default FilteredEventsPage;