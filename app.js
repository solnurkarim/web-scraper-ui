require('dotenv').config();
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const db_client = require('mongodb').MongoClient;

app.listen(process.env.PORT, () => {
    console.log('App initialized');
});

app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());
app.use(express.static(__dirname + "/public"));



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post('/search', (req, res) => {
    const keywords = req.body['input-query'];
    const price_min = Number(req.body['input-price-min']);
    const price_max = Number(req.body['input-price-max']);
    let pattern = keywords.replace(/[,| ]+/g, '|');
    pattern = new RegExp(pattern, 'i');

    db_client.connect(process.env.DB_URL, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) return console.log('DB: Connection error: ' + err);
        const db = client.db('kaz');
        const phones = db.collection('phones');

        let results = phones.find({
            $and: [{
                name: {
                    $regex: pattern
                },
                price: {
                    $gte: price_min,
                    $lte: price_max
                }
            }]

        });

        results.toArray((err, results) => {
            if (err) return console.log(err);
            res.status(200).send(results);
            client.close();
        })
    })
})