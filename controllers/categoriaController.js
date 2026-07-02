import categoriaModel from "../models/categoriaModel.js";

class CategoriaController {
    async getAllCategorias(req, res) {
        try {
            const allCategorias = await categoriaModel.showCategorias();

            if (allCategorias.length === 0) {
                return res.status(404).json();
            };

            return res.json(allCategorias);
        } catch (error) {
            return res.json({ message: `Ocorreu um erro: ${error}` })
        }
    }

    async getCategoriaById(req, res) {
        try {
            const id = Number(req.params.id);
            const findCategoria = await categoriaModel.getCategoriaById(id);
            if (!findCategoria) {
                return res.status(404).json({ message: `sucess` })
            }

            return res.json(findCategoria);
        } catch (error) {
            return res.json({ message: `Ocorreu um erro: ${error}` })
        }
    };

    async addCategoria(req, res) {
        try {
            const categoria = req.body;

            if (!categoria) {
                return res.json({ message: "Nenhuma categoria fornecida!" });
            };

            const createCategoria = await categoriaModel.createCategoria(categoria);

            if (createCategoria.affectedRows === 0) {
                return res.json({ message: "Não foi possível cadastrar a categoria" })
            }

            return res.status(201).json({ message: "Categoria criada com sucesso" })
        } catch (error) {
            return res.json({ message: `Ocorreu um erro: ${error}` })
        }
    }

    async updateCategoria(req, res) {
        try {
            const id = Number(req.params.id);
            const dados = req.body;

            const { categoria } = await categoriaModel.updateCategoria(id, dados)

            return res.json({ message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            return res.json({ message: `Ocorreu um erro: ${error}` })
        }
    };

    async deleteCategoria(req, res) {
        try {
            const id = Number(req.params.id);
            const deleteCategoria = await categoriaModel.deleteCategoria(id);

            if (deleteCategoria.affectedRows === 0) {
                return res.json({ message: "Não foi possível deletar a categoria!" })
            }

            return res.json({ message: "Categoria deletada com sucesso!" })
        } catch (error) {
            return res.json({ message: `Ocorreu um erro: ${error}` })
        }
    }
}


export default new CategoriaController();