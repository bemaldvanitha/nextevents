import Image from "next/image";

import Button from "../ui/button";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

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
            <Image src={ '/' + props.image } alt={props.title} width={350} height={250}/>
            <div className={classes.content}>
                <div>
                    <h2>{ props.title }</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{ humanReadableDate }</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{ formattedAddress }</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${props.id}`}>
                        <span>
                            Explore Events
                        </span>
                        <span className={classes.icon}>
                            <ArrowRightIcon/>
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem;