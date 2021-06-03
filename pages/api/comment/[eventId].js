import { MongoClient } from 'mongodb';

async function connectDatabase(){
    const client = await MongoClient.connect('mongodb+srv://bemaldvanitha:Bemal123@devconnector.2jyrs.mongodb.net/nextevents?retryWrites=true&w=majority');
    return client;
}

async function insertDocument(client,document){
    const db = client.db();
    const result = await db.collection('comments').insertOne(document);
    return result;
}

const handler = async (req,res) => {
    const eventId = req.query.eventId;
    let client;

    try{
        client = await connectDatabase();
    }catch (err){
        return res.status(500).json({ message: 'Connecting to db fail' });
    }

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

        try{
            const result = await insertDocument(client,newComment);
            newComment._id = result.insertedId;
        }catch (err){
            return res.status(500).json({ message: 'insert comment fail' });
        }

        return res.status(201).json({ msg: 'hello', comment: newComment });

    }else if(req.method === 'GET'){

        const db = client.db();
        let documents;

        try{

            documents = await db.collection('comments').find().sort({
                _id: -1
            }).toArray();

        }catch (err) {
            return res.status(500).json({ message: 'get document fail' });
        }

        return res.status(200).json({ comments: documents });
    }

    await client.close();
}

export default handler;