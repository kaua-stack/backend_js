import clientesModel from "../models/clienteModel.js";

class ClientesController {
    async getAllClientes(req, res) {
        try {
            const allClientes = await clientesModel.showClientes();
            if (allClientes.length === 0) {
                return res.json({
                    message: "Nenhum usuário encontrado!",
                });
            }
            return res.json(allClientes);
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }

    async getClienteById(req, res) {

        try {
            const id = Number(req.params.id);
            const findCliente = await clientesModel.getClienteById(id);
            if (!findCliente) {
                return res.status(404).json();
            }
            return res.json(findCliente);
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }

    async clienteByEmail(req, res) {
        try {

            const { email } = req.params;

            const [findEmail] = await clientesModel.getClienteByEmail(email);

            if (findEmail?.email === email) {
                return res.json({
                    findEmail
                });
            }
            return res.json({ email: findEmail.email })
        } catch (error) {
            return res.json({ message: `Erro errado ocorreu um erro: ${error}` })
        }
    }

    async storeCliente(req, res) {
        try {
            const { nome, email, telefone, cidade, estado } = req.body;

            // if (nome === "" || !email || !telefone || !cidade || !estado) {
            //     return res.json({ message: "Todos os campos são Obrigatórios" });
            // }

            const [findEmail] = await clientesModel.getClienteByEmail(email);



            // if (findEmail?.email === email) {
            //     return res.json({
            //         message: "Email já cadastrado!",
            //     });
            // }

            if (findEmail) {
                return res.json({
                    message: "Email já cadastrado!",
                });
            }

            const createCliente = await clientesModel.createCliente(req.body);

            if (createCliente.affectedRows > 0) {
                return res.json({
                    message: "Cliente cadastrado com sucesso!",
                });
            }

            return res.status(201).json();
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    };

    async updateCLienteById(req, res) {
        try {
            const id = Number(req.params.id);
            const { nome, email, telefone, cidade, estado } = req.body;
            const [findEmail] = await clientesModel.getClienteByEmail(email, id);


            // if (!nome || !email || !telefone || !cidade || !estado) {
            //     return res.json({ message: "Todos os campos são Obrigatórios" });
            // }

            if (findEmail) {
                return res.json({
                    message: "Email já cadastrado!",
                });
            }

            const updateCliente = await clientesModel.updateCliente(id, req.body);

            if (updateCliente.affectedRows > 0) {
                return res.json({
                    message: "Cliente atualizado com sucesso!",
                });
            }

            return res.json({
                message: "Cadastro realizado com Sucesso!",
            });
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }

    async removeCliente(req, res) {
        try {
            const id = Number(req.params.id);
            const deleteCliente = await clientesModel.deleteCliente(id);

            if (deleteCliente.affectedRows === 0) {
                return res.json({
                    message: "Não foi possível realizar a exclusão!",
                });
            }
            return res.json({
                message: "Cadastro excluído com Sucesso!",
            });
        } catch (error) {
            return res.json({ message: `ocorreu um erro: ${error}` })
        }
    }
}

export default new ClientesController();