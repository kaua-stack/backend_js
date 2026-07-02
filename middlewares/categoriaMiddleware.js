const validateCategoria = (req, res, next) => {
    const { nome } = req.body;
    const errors = [];

    if (!nome || nome.trim() === "") {
        errors.push("O campo nome é obrigatório.");
    } else if (nome.length > 100) {
        errors.push("O campo nome deve conter no máximo 100 caracteres.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export default validateCategoria;