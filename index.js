const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});

const herois = [{
        "id": 0,
        "heroi": "Thor"
    },
    {
        "id": 1,
        "heroi": "Diana"

    },{
        "id": 2,
        "heroi": "Peter Parker"
    },{
        "id": 3,
        "heroi": "Chapolin Colorado"
    }
]

app.get('/herois', function (req, res) {
    res.send(herois)
})


app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`)
})