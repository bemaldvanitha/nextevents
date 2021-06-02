import { MongoClient } from 'mongodb';

const handler = async (req,res) => {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect('mongodb+srv://bemaldvanitha:Bemal123@devconnector.2jyrs.mongodb.net/nextevents?retryWrites=true&w=majority');
    const db = client.db();

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            return res.status(422).json({ message: 'Invalid input' });
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };

        const result = await db.collection('comments').insertOne(newComment);
        newComment.id = result.insertedId;

        return res.status(201).json({ msg: 'hello', comment: newComment });

    }else if(req.method === 'GET'){

        const dummyList = [
            { id: 'c1', name: 'bemal', text: 'hello' },
            { id: 'c2', name: 'dvanitha', text: 'hello 2' },
        ]

        return res.status(200).json({ comments: dummyList });
    }

    await client.close();
}

export default handler;