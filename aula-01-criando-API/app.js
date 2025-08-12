//Importando express
import express from "express";

const app = express();

//Configurações do express

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Criando um retorno da API
app.get("/", (req, res) => {
  const games = [
    {
      title: "Delta",
      year: 2024,
      genre: "FPS",
      plataform: "PC (Windows)",
      price: 0,
    },
    {
      title: "DiabloIII",
      year: 2012,
      genre: "RPG",
      plataform: "PC (Windows)",
      price: 0,
    },

    {
      title: "League of Legends",
      year: 2009,
      genre: "MOBA",
      plataform: "PC (Windows)",
      price: 0,
    },
  ];
  res.json(games);
});

//Rodando api na porta 4000

app.listen(4000, (error) => {
  if (error) {
    console.log("Ocorreu um erro " + error);
  } else {
    console.log(`API rodando em http://localhost:${4000}`);
  }
});
