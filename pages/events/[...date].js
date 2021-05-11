import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = () => {
    const router = useRouter();
    const yearAndMonth = router.query.date;

    if(!yearAndMonth) {
        return <p className={'center'}>Loading....</p>
    }

    const filteredYear = yearAndMonth[0];
    const filteredMonth = yearAndMonth[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numMonth) || isNaN(numYear) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

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

    const date = new Date(numYear, numMonth - 1 );

    return(
        <>
            <ResultsTitle date={date}/>
            <EventList events={filteredEvents}/>
        </>
    )
}

export default FilteredEventsPage;