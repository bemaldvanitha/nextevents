import { MongoClient } from 'mongodb';

const handler = async (req,res) => {

    if(req.method === 'POST'){
        const { email } = req.body;

        if(!email  || !email.includes('@')){
            return res.status(422).json({ message: 'invalid email' });
        }

        const client = await MongoClient.connect('mongodb+srv://bemaldvanitha:Bemal123@devconnector.2jyrs.mongodb.net/nextevents?retryWrites=true&w=majority');
        const db = client.db();

        await db.collection('emails').insertOne({
            email: email
        });

        await client.close();

        return res.status(201).json({ message: 'sign up' });
    }
}

export default handler;