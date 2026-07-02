import pool from "../db/database.js";

class CategoriaModel {


    async showCategorias() {
        const [rows] = await pool.query("SELECT * FROM categorias;");
        return rows;
    }

    async getCategoriaById(id) {
        const [rows] = await pool.query("SELECT * FROM categorias WHERE id_categoria = ?;", [id]);
        return rows[0];
    }

    async createCategoria(categoriaDb) {
        const { categoria } = categoriaDb;
        const [row] = await pool.execute("INSERT INTO categorias (categoria) VALUES (?);", [categoria]);
        return row
    }

    async updateCategoria(id, dados) {
        const { categoria: categoriaTexto } = dados;

        const [row] = await pool.execute("UPDATE categorias SET categoria=? WHERE id_categoria = ?;", [categoriaTexto, id]);
        return row;
    }

    async deleteCategoria(id) {
        const [row] = await pool.execute("DELETE FROM categorias where id_categoria=?;", [id]);
        return row;
    }
}

export default new CategoriaModel();