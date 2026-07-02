import pool from "../db/database.js";

class LivroModel {
    async showLivros() {
        const [rows] = await pool.query("SELECT l.id_livro,l.titulo AS titulo_livro,l.autor,l.ano_publicacao,l.preco,e.nome AS nome_editora,cat.categoria AS nome_categoria FROM livros l INNER JOIN editoras e ON l.id_editora = e.id_editora INNER JOIN categorias cat ON l.id_categoria = cat.id_categoria;");
        return rows;
    }

    async getLivroById(id) {
        const [rows] = await pool.query("SELECT * FROM livros WHERE id_livro = ?", [id]);
        return rows[0];
    }

    async createLivro(livroData) {
        const { titulo, autor, ano_publicacao, id_editora, id_categoria, preco } = livroData;
        const [row] = await pool.execute("INSERT INTO livros (titulo,autor,ano_publicacao,id_editora,id_categoria,preco) VALUES (?,?,?,?,?,?);", [titulo, autor, ano_publicacao, id_editora, id_categoria, preco]);
        return row
    }

    async updateLivro(id, livroData) {
        const { titulo, autor, ano_publicacao, id_editora, id_categoria, preco } = livroData;
        const [row] = await pool.execute("UPDATE livros SET titulo=?,autor=?,ano_publicacao=?,id_editora=?,id_categoria=?,preco=? WHERE id_livro = ?;", [titulo, autor, ano_publicacao, id_editora, id_categoria, preco, id]);
        return row;
    }

    async deleteLivro(id) {
        const [row] = await pool.execute("DELETE FROM livros WHERE id_livro=?;", [id]);
        return row;
    }
}

export default new LivroModel();