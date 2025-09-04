// Import o service

import userService from "../services/userService.js";

// Função para Cadastrar um Usúario
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userService.Create(name, email, password);
    res.status(201).json({ sucess: "Usuário cadastrado com sucesso!" }); // Cod. 201: CREATED
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {    createUser  };
