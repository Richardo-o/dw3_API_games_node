import gamesService from "../services/gamesService.js";
import { ObjectId } from "mongodb";
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
    const { title, year, price, descriptions } = req.body;
    await gamesService.Create(title, year, price, descriptions);
    res.sendStatus(201); // Código 201 (CREATED) : Recurso criado com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para DELETAR jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gamesService.Delete(id);
      res.sendStatus(204); // Código 204 (NO CONTENT) - Requisição bem sucedida,mas não há conteúdo para retornar.
    } else {
      // Se o ID não for válido
      res.status(400).json({ error: "A ID enviada é inválida" }); // Código 400 é o (BAD REQUEST) - Requisição mal formada
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor." });
  }

  // res.status(500).json({} -> Para enviar json junto)
  // res.sendStatus(500) -> Somente código de status
};

// Função para ALTERAR jogos

const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, price, descriptions } = req.body;
      const game = await gamesService.Update(id, title, year, price, descriptions);
      res.status(200).json({game}); // Código 200 (OK)
    } else {
      res.sendStatus(400); // Código 400 (BAD REQUEST)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para BUSCAR UM ÚNICO jogo
const getOneGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const game = await gamesService.getOne(id);
      if (!game) {
        res.status(404).json({ error: "O jogo não foi encontrado." }); // Not found: Não encontrado
      } else {
        res.status(200).json({ game });
      }
    }else{
      res.status(400).json({error: "A ID enviada é inválida"}) // BAD request: Requisição Inválida
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); //Erro interno do servidor
  }
};

export default { getAllGames, createGame, deleteGame, updateGame, getOneGame };
