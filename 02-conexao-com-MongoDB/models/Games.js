import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
  title: String,
  plataform: String,
  genre: String,
  year: Number,
  price: Number,
});

//CRIANDO COLEÇÃO

const Game = mongoose.model("Game", gamesSchema);

export default Game;
