const validateCliente = (req, res, next) => {
    const { nome, email, telefone, cidade, estado } = req.body;
    const errors = [];

    // uma outra forma de declarar varias variaveis
    // const   newnome = nome.trim().toUpperCase(),
    //         newEmail = email.trim().toUpperCase(),
    //         newCidade = cidade.trim().toUpperCase(),
    //         newEstado = estado.trim().toUpperCase()

    if (!nome || nome.trim() === "") {
        errors.push("O campo nome é obrigatório.");
    } else if (nome.length > 100) {
        errors.push("O campo nome deve conter no máximo 100 caracteres.");
    }

    if (!email || email.trim() === "") {
        errors.push("O campo email é obrigatório.");
    } else if (email.trim().length > 100 && email.trim().length > 3) {
        const emailRegex = /^[^0-9\s@][^\s@]*@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errors.push("O campo email deve conter um endereço de email válido.");
        } else if (email.length > 100) {
            errors.push("O campo email deve conter no máximo 100 caracteres.");
        }
    }

    if (!telefone || telefone.trim().length > 20) {
        errors.push("O campo deve ter no maximo 20 caracteres.");
    }

    if (!cidade || cidade.trim() === "") {
        errors.push("O campo cidade é obrigatório.");
    }

    if (!estado || estado.trim().length !== 2) {
        errors.push("O campo deve ter 2 caracteres");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export default validateCliente;