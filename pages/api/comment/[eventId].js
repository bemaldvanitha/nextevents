const handler = (req,res) => {
    const eventId = req.query.eventId;

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            return res.status(422).json({ message: 'Invalid input' });
        }

        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text
        }

        return res.status(201).json({ msg: 'hello', comment: newComment });

    }else if(req.method === 'GET'){

        const dummyList = [
            { id: 'c1', name: 'bemal', text: 'hello' },
            { id: 'c2', name: 'dvanitha', text: 'hello 2' },
        ]

        return res.status(200).json({ comments: dummyList });
    }
}

export default handler;