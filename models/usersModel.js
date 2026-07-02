import pool from "../db/database.js";

class UserModel {
    async selectAllUsers() {
        const query = `SELECT * FROM users`;

        const [rows] = await pool.execute(query);
        return rows;
    }

    async selectUserById(id) {
        const query = `SELECT * FROM users WHERE user_id = ?`;

        const [rows] = await pool.execute(query, [id]);
        return rows;
    }

    async selectUserByEmail(email, id = 0) {
        const query = `SELECT * FROM 
        users WHERE user_email = ? AND user_id != ?;`;

        const [row] = await pool.execute(query, [email, id]);

        return row;
    }

    async insertUser(user) {
        const {
            user_name,
            user_email,
            user_password,
            user_phone,
            role_id,
            user_status,
        } = user;

        const query = `INSERT INTO users
        (user_name, user_email, user_password, user_phone, role_id, user_status)
    VALUES
        (?, ?, ?, ?, ?, ?)`;

        const [result] = await pool.execute(query, [
            user_name,
            user_email,
            user_password,
            user_phone,
            role_id,
            user_status,
        ]);

        return result;
    }

    async updateUser(id, user) {
        const {
            user_name,
            user_email,
            user_password,
            user_phone,
            role_id,
            user_status,
        } = user;

        const query = `
        UPDATE users
        SET
            user_name = ?,
            user_email = ?,
            user_password = ?,
            user_phone = ?,
            role_id = ?,
            user_status = ?
        WHERE user_id = ?
    `;

        const [result] = await pool.execute(query, [
            user_name,
            user_email,
            user_password,
            user_phone,
            role_id,
            user_status,
            id,
        ]);

        return result;
    }

    async deleteUser(id) {
        const query = `DELETE FROM users WHERE user_id = ?;`;

        const [result] = await pool.execute(query, [id]);

        return result;
    }
}

export default new UserModel();
