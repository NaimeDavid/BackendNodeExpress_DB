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
  // const getMensagemValida = () => {
  //   return herois.filter(Boolean);
  // };
  // const getMensagemByID = (id) => {
  //   return getMensagemValida().find((msg) => msg.id === id);
  // };
  //---x---

  //GET all
  app.get("/herois", async function (req, res) {
    const docs = await collection.find().toArray();
    res.send(docs);
  });

  //GET by ID
  app.get("/herois/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });

    res.send(item);
  });

  //POST
  app.post("/herois", async function (req, res) {
    const novo_heroi = req.body;

    await collection.insertOne(novo_heroi);

    res.send(novo_heroi);
  });

  //DELETE
  app.delete("/herois/:id", async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne({ _id: ObjectId(id) });

    res.send("Herói deletado.");
  });

  //UPDATE 
  app.put("/herois/:id", function (req, res) {
    const id = req.params.id;

    const novo_heroi = req.body;

    collection.updateOne(
      { _id: ObjectId(id) },

      {
        $set: novo_heroi,
      }
    );

    res.send(novo_heroi);
  });

  app.listen(port, function () {
    console.log(`App rodando em http://localhost:${port}`);
  });
}
main();
