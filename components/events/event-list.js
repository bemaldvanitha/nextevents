import EventItem from "./EventItem";

const EventList = (props) => {
    return(
        <ul>
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