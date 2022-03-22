const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbname = "herois_22_03_2022";

var bodyParser = require("body-parser");
const { json } = require("express/lib/response");

async function main() {
  console.log("Conectando ao banco de dados...");
  const client = await MongoClient.connect(url);
  const db = client.db(dbname);
  const collection = db.collection("herois");

  console.log("Conexão com o banco de dados realizada com sucesso!");

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
  ];

  //---x---
  const getMensagemValida = () => {
    return herois.filter(Boolean);
  };
  const getMensagemByID = (id) => {
    return getMensagemValida().find((msg) => msg.id === id);
  };
  //---x---

  //GET all
  app.get("/herois", function (req, res) {
    res.send(herois.filter(Boolean));
  });

  //GET by ID
  app.get("/herois/:id", function (req, res) {
    const id = +req.params.id;
    const mensagem = getMensagemByID(id);

    res.send(mensagem);
  });

  //POST
  app.post("/herois", function (req, res) {
    const mensagem = req.body;
    mensagem.id = herois.length;

    herois.push(mensagem);
    res.send("Item adicionado com sucesso.");
  });

  //DELETE
  app.delete("/herois/:id", function (req, res) {
    const id = +req.params.id;
    const mensagem = getMensagemByID(id);
    const index = herois.indexOf(mensagem);

    delete herois[index];
    res.send("Herói deletado.");
  });

  //UPDATE - troca o nome do heroi pelo ID
  app.put("/herois/:id", function (req, res) {
    const id = +req.params.id;
    const mensagem = getMensagemByID(id);
    const newHero = req.body.heroi;

    mensagem.heroi = newHero;
    res.send("Herói atualizado");
  });

  app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`);
  });
}
main();
