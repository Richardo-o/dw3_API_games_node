import mongoose from "mongoose";

// Criando um documento aninhado
const descriptionSchema = new mongoose.Schema({
  genre: String,
  plataform: String,
  rating: String,
});

const gamesSchema = new mongoose.Schema({
  title: String,
  year: Number,
  price: Number,
  descriptions: descriptionSchema,
});

//CRIANDO COLEÇÃO

const Game = mongoose.model("Game", gamesSchema);

export default Game;
