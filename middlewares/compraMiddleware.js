const validateCompra = (req, res, next) => {
    const { id_cliente, id_livro, quantidade } = req.body;
    const errors = [];

    if (!id_cliente || typeof id_cliente !== "number") {
        errors.push("O campo id cliente é obrigatório e deve ser um número.");
    }

    if (!id_livro || typeof id_livro !== "number") {
        errors.push("O campo id livro é obrigatório e deve ser um número.");
    }

    if (!quantidade || typeof quantidade !== "number" || quantidade <= 0) {
        errors.push("O campo quantidade é obrigatório, deve ser um número e maior que zero.");
    }

    if (!valor || typeof valor !== "number" || valor <= 0) {
        errors.push("O campo valor é obrigatório, deve ser um número e maior que zero.");
    }

    if (!desconto || typeof desconto !== "number" || desconto < 0) {
        errors.push("O campo desconto é obrigatório, deve ser um número e não pode ser negativo.");
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export default validateCompra;