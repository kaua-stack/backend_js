import enderecoModel from "../models/enderecoModel.js";

class enderecoController {
    async createEndereco(req, res) {

        const { cep } = req.body;

        if (!cep) {
            return res.status(400).json({ message: "CEP nao encontrado." });
        }

        const [selectEnderecoBycep] = await enderecoModel.selectEnderecoBycep(cep);

        if (selectEnderecoBycep) {
            return res.status(400).json({
                error: "CEP já cadastrado no banco de dados."
            });
        }

        const getEndereco = await fetch(`http://viacep.com.br/ws/${cep}/json/`);

        const jsonEndereco = await getEndereco.json();

        const newEndereco = {
            id_cliente,
            logradouro: jsonEndereco.logradouro,
            numero,
            complemento,
            bairro: jsonEndereco.bairro,
            cidade: jsonEndereco.localidade,
            estado: jsonEndereco.uf,
            cep
        };

        const enderecoCreated = await enderecoModel.createEndereco(newEndereco);
        if (enderecoCreated.affectedRows > 0) {
            return res.status(200).json({
                suscess: "Endereco cadastrado com sucesso."
            });
        }

        return res.status(500).json({
            error: "Erro ao cadastrar endereco."
        });

    };


    async enderecoDelete(req, res) {
        const { endereco_id } = req.params;
        const enderecoDeleted = await enderecoModel.deleteEnderecoByendereco_id(endereco_id);
        return res.status(200).json({
            message: "Endereco deletado com sucesso."
        });
    }

};
export default new enderecoController();