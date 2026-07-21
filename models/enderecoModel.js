import pool from "../db/database.js";

class EnderecoModel {
    async createEndereco(endereco) {
        const { id_cliente, logradouro, numero, bairro, cidade, estado, cep } = endereco;
        const [result] = await pool.query("INSERT INTO endereco (id_cliente,  logradouro, numero, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id_cliente, logradouro, numero, bairro, cidade, estado, cep]
        );
        return result;
    }

    async selectEnderecoBycep(cep) {
        const query = "SELECT * FROM endereco WHERE cep = ?";
        const [result] = await pool.query(query, [cep]);
        return result;
    }







    async deleteEnderecoByendereco_id(endereco_id) {
        const query = " DELETE FROM endereco WHERE endereco_id = ?";
        const [row] = await pool.query(query, [endereco_id]);
        return row;
    };
}

export default new EnderecoModel();