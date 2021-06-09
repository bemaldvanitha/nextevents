import { useState, useContext } from 'react';
import axios from "axios";

import classes from './newsletter-registration.module.css';
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
    const [email,setEmail] = useState('');

    const notificationCtx = useContext(NotificationContext);

    async function registrationHandler(event) {
        event.preventDefault();

        notificationCtx.showNotification({
            title: 'Sign up',
            message: 'registering for newsletter',
            status: 'pending'
        });

        try{

            const res = await axios.post('http://localhost:3000/api/newsletter',{
                email: email
            });

            if(res.status !== 201){
                throw new Error('some thing error');
            }

            notificationCtx.showNotification({
                title: 'Success',
                message: 'registration success',
                status: 'success'
            });

        }catch (err){

            notificationCtx.showNotification({
                title: 'Sign up error',
                message: err.message || 'Something wrong',
                status: 'error'
            });
        }
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;