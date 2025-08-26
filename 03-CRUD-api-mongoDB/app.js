
import express from "express";
import mongoose from "mongoose";
import Game from "./models/Games.js";
//Importando as rotas
import gameRoutes from "./routes/gameRoutes.js";

const app = express();

//Configurações do express

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', gameRoutes)

//Iniciando a conexão com o banco de dados do MongoDB

 mongoose.connect("mongodb://127.0.0.1:27017/api-thegames")

//Rodando api na porta 4000

app.listen(4000, (error) => {
  if (error) {
    console.log("Ocorreu um erro " + error);
  } else {
    console.log(`API rodando em http://localhost:${4000}`);
  }
});
