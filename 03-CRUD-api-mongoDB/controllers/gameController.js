import gamesService from "../services/gamesService.js";
//Função para LISTAR jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gamesService.getAll();
    res.status(200).json({ games: games }); // Código 200 OK -- requisição tratada com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para CADASTRAR jogos
const createGame = async (req, res) => {
  try {
    const { title, year, genre, plataform, price } = req.body;
    await gamesService.Create(title, year, genre, plataform, price);
    res.sendStatus(201); // Código 201 (CREATED) : Recurso criado com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { getAllGames, createGame };
