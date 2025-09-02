
import express from "express";
import mongoose from "mongoose";
import Game from "./models/Games.js";

const app = express();

//Configurações do express

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Iniciando a conexão com o banco de dados do MongoDB

 mongoose.connect("mongodb://127.0.0.1:27017/api-thegames")

//Criando um retorno da API
app.get("/", async (req, res) => {
  try{
    const games = await Game.find()
    res.status(200).json({games: games}) // Código 200 : OK (Requisição bem sucedida)
  }catch(error){
    console.log(error)
    res.status(500).json({error : 'Erro interno do servidor'})
  }
});

//Rodando api na porta 4000

app.listen(4000, (error) => {
  if (error) {
    console.log("Ocorreu um erro " + error);
  } else {
    console.log(`API rodando em http://localhost:${4000}`);
  }
});
