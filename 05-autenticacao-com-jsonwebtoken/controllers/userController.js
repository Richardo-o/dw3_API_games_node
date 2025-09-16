// Importando o service
import userService from "../services/userService.js";

//Importando o JWT

import jwt from "jsonwebtoken";

//Importando dotenv
import dotenv from "dotenv"

dotenv.config();

// Segredo para o token (é recomendado que o segredo esteja nas variáveis de ambiente)
const JWTSecret = process.env.JWTSECRET;

// Importando o bcrypt (para fazer o hash de senha)
import bcrypt from "bcrypt";

// Função para CADASTRAR um Usuário
const createUser = async (req, res) => {
  try {
    // Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    // VERIFICA SE O USUÁRIO JA EXISTE
    const user = await userService.getOne(email);
    // SE NÃO OUVER USUÁRIO JA CADASTRADO
    if (user == undefined) {
      // AQUI SERÁ FEITO O HASH DA SENHA
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // Cadastrando o usuário
      await userService.Create(name, email, hash);
      res.status(201).json({ success: "Usuário cadastrado com sucesso!" }); // Cod. 201: CREATED
    }
    // SE O USUÁRIO JA ESTIVER CADASTRADO
    else {
      res.status(409).json({ error: "O usuário informado já está cadastrado" }); // Cod. de conflito
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Erro interno do servidor
  }
};

// FUNÇÃO para realizar o LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getOne(email);
    if (user != undefined) {
      //SENHA CORRETA

      //COMPARANDO HASH DE SENHA
      const correct = bcrypt.compareSync(password, user.password);

      // Se a senha for valida

      if (correct) {
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400).json({
                error: "Não foi possivel gerar o token de autenticação.",
              });
            } else {
              //token gerado com sucesso
              res.status(200).json({ token });
            }
          }
        );
      } else {
        //SENHA INCORRETA
        res.status(401).json({ error: "Credenciais invalidas" }); // 401: Não autorizado
      }
    } else {
      res.status(404).json({ error: "Usuário não encontrado!" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { createUser, loginUser, JWTSecret };
