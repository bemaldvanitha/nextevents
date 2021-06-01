import { useState } from 'react';
import axios from "axios";

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const [email,setEmail] = useState('');

    async function registrationHandler(event) {
        event.preventDefault();

        const res = await axios.post('http://localhost:3000/api/newsletter',{
            email: email
        });
        console.log(res.data);
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