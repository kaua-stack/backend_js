const validateLivro = (req, res, next) => {
    const { titulo, autor, id_categoria, id_editora } = req.body;
    const errors = [];

    if (!titulo || titulo.trim() === "") {
        errors.push("O campo titulo é obrigatório.");
    } else if (titulo.length > 100) {
        errors.push("O campo titulo deve conter no máximo 100 caracteres.");
    }

    if (!autor || autor.trim() === "") {
        errors.push("O campo autor é obrigatório.");
    } else if (autor.length > 100) {
        errors.push("O campo autor deve conter no máximo 100 caracteres.");
    }

    if (!id_categoria || typeof id_categoria !== "number") {
        errors.push("O campo id categoria é obrigatório e deve ser um número.");
    }

    if (!id_editora || typeof id_editora !== "number") {
        errors.push("O campo id editora é obrigatório e deve ser um número.");
    }

    if (!preco || typeof preco !== "number" || preco <= 0) {
        errors.push("O campo preço é obrigatório, deve ser um número e maior que zero.");
    }

    if (!ano_publicacao) {
        errors.push("O campo ano de publicação é obrigatório");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export default validateLivro;