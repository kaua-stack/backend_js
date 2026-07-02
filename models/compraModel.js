import pool from "../db/database.js";

class CompraModel {

    async showCompras() {
        const [rows] = await pool.query("SELECT co.id_compra,c.nome AS nome_cliente,l.titulo AS titulo_livro,l.autor AS autor_livro,co.qtde AS quantidade,co.valor AS valor_unitario,co.desconto,(co.qtde * co.valor) - IFNULL(co.desconto, 0) AS valor_total,co.data_compra FROM compras co INNER JOIN clientes c ON co.id_cliente = c.id_cliente INNER JOIN livros   l ON co.id_livro = l.id_livro;");
        return rows;
    }

    // async getCompraById(id) {
    //     const [rows] = await pool.query("SELECT * FROM compras WHERE id_compra = ?;", [id]);
    //     return rows[0];
    // }

    async getCompraById(id) {
        const [rows] = await pool.query(`SELECT 
            c.id_compra,
            c.qtde,
            c.valor,
            c.desconto,
            c.data_compra,
            l.titulo AS nome_livro,
            cl.nome AS nome_cliente
        FROM compras c
        INNER JOIN livros l ON c.id_livro = l.id_livro
        INNER JOIN clientes cl ON c.id_cliente = cl.id_cliente
        WHERE c.id_compra = ?;`, [id]);
        return rows[0];
    }

    async createCompra(compraData) {
        const { qtde, valor, desconto, id_livro, id_cliente } = compraData;
        const [row] = await pool.execute("INSERT INTO compras (qtde,valor,desconto,id_livro,id_cliente) VALUES (?,?,?,?,?);", [qtde, valor, desconto, id_livro, id_cliente]);
        return row
    }

    async updateCompra(id, compraData) {
        const { qtde, valor, desconto, data_compra, id_livro, id_cliente } = compraData;
        const [row] = await pool.execute("UPDATE compras SET qtde=?,valor=?,desconto=?,data_compra=?,id_livro=?,id_cliente=? WHERE id_compra = ?;", [qtde, valor, desconto, data_compra, id_livro, id_cliente, id]);
        return row
    }

    async deleteCompra(id) {
        const [row] = await pool.execute("DELETE FROM compras where id_compra=?;", [id]);
        return row;
    }
}

export default new CompraModel();