import Link from "next/link";

import Button from "../ui/button";

import classes from './event-item.module.css';

const EventItem = (props) => {

    const humanReadableDate = new Date(props.date).toLocaleDateString('en-US',{
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedAddress = props.location.replace(', ','\n');

    return(
        <li className={classes.item}>
            <img src={ '/' + props.image } alt={props.title}/>
            <div className={classes.content}>
                <div>
                    <h2>{ props.title }</h2>
                    <div className={classes.date}>
                        <time>{ humanReadableDate }</time>
                    </div>
                    <div className={classes.address}>
                        <address>{ formattedAddress }</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${props.id}`}>Explore Events</Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem;