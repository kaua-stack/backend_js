import livroModel from "../models/livroModel.js";

class LivroController {
    async getAllLivros(req, res) {
        try {
            const allLivros = await livroModel.showLivros();
            if (allLivros.length === 0) {
                return res.json({
                    message: "Nenhum livro encontrado!",
                });
            }
            return res.json(allLivros);
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }

    async getLivroById(req, res) {
        try {
            const id = Number(req.params.id);
            const findLivro = await livroModel.getLivroById(id);
            if (!findLivro) {
                return res.status(404).json();
            }
            return res.json(findLivro);
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }

    async addLivro(req, res) {
        try {
            const { titulo, autor, ano_publicacao, id_editora, id_categoria, preco } = req.body;

            if (!titulo || !autor || !ano_publicacao || !id_editora || !id_categoria || !preco) {
                return res.json({ message: "Todos os campos são Obrigatórios" });
            }

            const createLivro = await livroModel.createLivro(req.body);

            if (createLivro.affectedRows === 0) {
                return res.json({
                    message: "Não foi possível cadastrar o livro!",
                });
            }

            return res.status(201).json({ message: "Livro cadastrado com sucesso" });
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    };

    async updateLivroById(req, res) {
        try {
            const id = Number(req.params.id);
            const { titulo, autor, ano_publicacao, id_editora, id_categoria, preco } = req.body;

            //se os campos estiverem diferentes de preenchidos, ou seja, vazios ou nulos, retorna a mensagem de erro
            if (!titulo || !autor || !ano_publicacao || !id_editora || !id_categoria || !preco) {
                return res.json({ message: "Todos os campos são Obrigatórios" });
            }

            const updateLivro = await livroModel.updateLivro(id, req.body);

            //verifica se alguma linha foi afetada se não foi afetada, ou seja, se o id não existe, retorna a mensagem de erro
            if (updateLivro.affectedRows === 0) {
                return res.json({
                    message: "Não foi possível atualizar o livro!",
                });
            }

            return res.json({ message: "Livro atualizado com Sucesso!" });
        } catch (error) {
            //modelo correto retorna o status de erro e o erro.message para o cliente, para que ele possa entender o que aconteceu
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }

    async deleteLivroById(req, res) {
        try {
            const id = Number(req.params.id);
            const deleteLivro = await livroModel.deleteLivro(id);

            if (deleteLivro.affectedRows === 0) {
                return res.json({
                    message: "Não foi possível deletar o Livro!",
                });
            }

            return res.json({ message: "Livro deletado com Sucesso!" });
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` });
        }
    }
}

export default new LivroController();