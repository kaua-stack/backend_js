import compraModel from "../models/compraModel.js"

class CompraController {
    async getAllCompras(req, res) {
        try {
            const allCompras = await compraModel.showCompras();
            console.log("compras try");

            if (allCompras.length === 0) {
                return res.status(404).json();
            };

            return res.json(allCompras);
        } catch (error) {
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }

    async getComprasById(req, res) {
        try {
            const id = Number(req.params.id);
            const findCompra = await compraModel.getCompraById(id);

            if (!findCompra) {
                return res.status(404).json();
            }

            return res.json(findCompra);
        } catch (error) {
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }

    async addCompra(req, res) {
        try {
            const { id_cliente, id_livro, qtde, valor } = req.body;

            if (!id_cliente || !id_livro || !qtde || !valor) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
            }

            const createCompra = await compraModel.createCompra(req.body);

            if (createCompra.affectedRows === 0) {
                return res.status(500).json({ message: "Não foi possível cadastrar a compra!" })
            }

            return res.status(201).json({ message: "Compra cadastrada com sucesso!" })
        } catch (error) {
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }

    async updateCompra(req, res) {
        try {
            const id = Number(req.params.id);
            const { id_cliente, id_livro, qtde, valor } = req.body;

            if (!id_cliente || !id_livro || !qtde || !valor) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
            };
            const updateCompra = await compraModel.updateCompra(id, req.body);
            return res.json({ message: "Compra atualizada com sucesso!" });
        } catch (error) {
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }

    async deleteCompra(req, res) {
        try {
            const id = Number(req.params.id);
            const deleteCompra = await compraModel.deleteCompra(id);

            if (deleteCompra.affectedRows === 0) {
                return res.status(404).json();
            }

            return res.json({ message: "Compra deletada com sucesso!" });
        } catch (error) {
            return res.status(500).json({ message: `ocorreu um erro: ${error.message}` })
        }
    }
}

export default new CompraController();