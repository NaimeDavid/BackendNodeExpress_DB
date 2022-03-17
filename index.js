const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const herois = [
  {
    id: 0,
    heroi: "Thor",
  },
  {
    id: 1,
    heroi: "Diana",
  },
  {
    id: 2,
    heroi: "Peter Parker",
  },
  {
    id: 3,
    heroi: "Chapolin Colorado",
  },
];

app.get("/herois", function (req, res) {
  res.send(herois);
});

//---x---
const getMensagemValida = () => {
  return herois.filter(Boolean);
};
const getMensagemByID = id => {
  return getMensagemValida().find((msg) => msg.id === id);
};
//---x---
//GET by ID
app.get("/herois/:id", function (req, res) {
  const id = +req.params.id ; 
  const mensagem = getMensagemByID(id);
  res.send(mensagem);
});

app.listen(port, function () {
  console.log(`App rodando em http://localhost:${port}`);
});
