const validateEditora = (req, res, next) => {
    const { nome, email, telefone } = req.body;
    const errors = [];

    if (!nome || nome.trim() === "") {
        errors.push("O campo nome é obrigatório.");
    } else if (nome.length > 100) {
        errors.push("O campo nome deve conter no máximo 100 caracteres.");
    }

    if (!email || email.trim() === "") {
        errors.push("O campo email é obrigatório.");
    } else {
        const emailRegex = /^[^0-9\s@][^\s@]*@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errors.push("O campo email deve conter um endereço de email válido.");
        } else if (email.length > 100) {
            errors.push("O campo email deve conter no máximo 100 caracteres.");
        }
    }

    if (!telefone || telefone.trim().length > 20) {
        errors.push("O campo telefone deve conter no máximo 20 caracteres.");
    } else if (telefone.trim().length === 0) {
        errors.push("O campo telefone é obrigatório.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export default validateEditora;