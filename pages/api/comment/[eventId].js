const handler = (req,res) => {
    if(req.method === 'POST'){
        const eventId = req.query.eventId;
        const { email, name, text } = req.body;

        return res.status(200).json({ msg: 'hello' });

    }else if(req.method === 'GET'){
        return res.status(200).json({ msg: req.params });
    }
}

export default handler;