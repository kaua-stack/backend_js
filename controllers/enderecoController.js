import enderecoModel from "../models/enderecoModel.js";

class enderecoController {
    async createEndereco (req, res) {
        
            const {cep} = req.body;

            if (!cep) {
                return res.status(400).json({ message: "CEP nao encontrado." });
            }

            const [selectEnderecoBycep] = await enderecoModel.selectEnderecoBycep(cep);

            if(selectEnderecoBycep) {
                return res.status(400).json({
                    error : "CEP já cadastrado no banco de dados."
                });
            }

            const getEndereco = await fetch(`http://viacep.com.br/ws/${cep}/json/`);	
    
            const jsonEndereco = await getEndereco.json();
            
            const newEndereco = {
                id_cliente :"" ,
                logradouro: jsonEndereco.logradouro,
                numero: "",
                complemento : "",
                bairro: jsonEndereco.bairro,
                cidade: jsonEndereco.cidade,
                estado: jsonEndereco.uf,
                cep: jsonEndereco.cep
            };
    
            
            return res.status(200).json({
                endereco: newEndereco
            });
    };

}

export default new enderecoController();