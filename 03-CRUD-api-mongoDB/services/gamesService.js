import Game from "../models/Games.js";

// O service será responsável por conter os métodos de manipulção do banco

class gameService {
  // Buscando os registros do banco
  async getAll() {
    try {
      const games = await Game.find();
      return games;
    } catch (error) {
      console.log(error);
    }
  }
  async Create(title, year, genre, plataform, price) {
    try {
      const newGame = new Game({
        title,
        year,
        genre,
        plataform,
        price,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }
  // Deletando registros no banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com a id: ${id} foi deletado com sucesso.`)
    } catch (error) {
      console.log(error);
    }
  }

  // Alterando registro do banco
  async Update(id, title, year, genre, plataform, price){
    await Game.findByIdAndUpdate(id,{
      title,
      year,
      genre,
      plataform,
      price
    });
    console.log(`Dados do game com id ${id} alterados com sucesso.`);
  }catch(error){
    console.log(error);
  }
}

export default new gameService();
