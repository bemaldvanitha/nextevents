import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../dummy-data';

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
        return <p>Invalid filter</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if(!filteredEvents || filteredEvents.length === 0){
        return <p>No events found</p>
    }

    return(
        <div>
            <h1>Filtered events page</h1>
        </div>
    )
}

export default FilteredEventsPage;