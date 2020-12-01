const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const data = require('./data');
const hostname = 'localhost';
const port = 3035;

const renameKey = require('./utils').renameKey;
const minisearch = require('./utils').search;

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3030',
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let parsedData = renameKey(data, '_id', 'id');

minisearch.addAll(parsedData);

app.get('/search/:words', (req, res) => {
    let result = minisearch.search(req.params.words, { prefix: true });
    let availableProducts = result.filter((product) => product.isActive === 'true');

    res.send(availableProducts);
});

app.listen(port, () => console.log(`server running on ${hostname}:${port}`));
