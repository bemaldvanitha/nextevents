import EventItem from "./EventItem";

import classes from './event-list.module.css';

const EventList = (props) => {
    return(
        <ul className={classes.list}>
            {
                props.events.map(event => {
                    return(
                        <EventItem key={event.id} image={event.image} title={event.title}
                            location={event.location} id={event.id} date={event.date}/>
                    )
                })
            }
        </ul>
    )
}

export default EventList;