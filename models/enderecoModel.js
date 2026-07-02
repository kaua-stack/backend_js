import pool from "../db/database.js";

class EnderecoModel {
    async createEndereco(endereco){
        const { logradouro, numero, bairro, cidade, estado, cep } = endereco;

        const [result] = await pool.query(
            "INSERT INTO endereco (logradouro, numero, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)",
            [logradouro, numero, bairro, cidade, estado, cep]
        );
        return result; 
    }

    async selectEnderecoBycep(cep) {
        const query = "SELECT * FROM endereco WHERE cep = ?";
        const [result] = await pool.query(query, [cep]);
        return result;
    }
}

export default new EnderecoModel();