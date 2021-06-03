import { MongoClient } from 'mongodb';

async function connectDatabase(){
    const client = await MongoClient.connect('mongodb+srv://bemaldvanitha:Bemal123@devconnector.2jyrs.mongodb.net/nextevents?retryWrites=true&w=majority');
    return client;
}

async function insertDocument(client,document){

    const db = client.db();
    await db.collection('emails').insertOne(document);
}

const handler = async (req,res) => {

    if(req.method === 'POST'){
        const { email } = req.body;

        if(!email  || !email.includes('@')){
            return res.status(422).json({ message: 'invalid email' });
        }

        let client;

        try{
            client = await connectDatabase();
        }catch (err){
            return res.status(500).json({ message: 'connecting db fail' });
        }

        try{
            await insertDocument(client,{
                email: email
            });
            await client.close();

        }catch (err){
            return res.status(500).json({ message: 'insert data fail' });
        }

        return res.status(201).json({ message: 'sign up' });
    }
}

export default handler;