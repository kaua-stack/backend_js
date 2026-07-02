const validateUser = (req, res, next) => {
    const {
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id,
        user_status,
    } = req.body;

    let errors = [];

    const newName = user_name.trim();
    const newEmail = user_email.trim();
    const newPhone = user_phone.trim();
    const newPassword = user_password.trim();

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexPhone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const regexRoleId = /^[1-9]\d*$/; // Verifica se é um número inteiro positivo
    const regexUserStatus = /^\d$/; // Verifica se esta chegando um digito

    if (!newName) {
        errors.push("O nome é obrigatório!");
    } else if (newName.length < 3 || newName.length > 150) {
        errors.push("O nome deve ter entre 3 e 100 caracteres!");
    }

    if (!newEmail) {
        errors.push("O email é obrigatório!");
    } else {
        if (!regexEmail.test(newEmail)) {
            errors.push("Email inválido!");
        } else if (newEmail.length > 150) {
            errors.push("O email deve ter no máximo 150 caracteres!");
        }
    }

    if (!newPhone) {
        errors.push("O telefone é obrigatório!");
    } else if (!regexPhone.test(newPhone)) {
        errors.push("o telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX");
    }

    if (!newPassword) {
        errors.push("O senha é obrigatório!");
    } else if (!regexPassword.test(newPassword)) {
        errors.push(
            "A senha deve ter pelo menos 8 caracteres, contendo letra maiúscula, minúscula, número e caractere especial",
        );
    }

    if (!role_id) {
        errors.push("A regra é obrigatória!");
    } else if( !regexRoleId.test(role_id)) {
        errors.push("O role_id deve ser um número inteiro positivo!");
    }

    if (!user_status) {
        errors.push("O status é obrigatória!");
    } else if( !regexUserStatus.test(user_status)) {
        errors.push("O status deve ser um número inteiro!");
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: errors[0] });
    }

    next();
};

export default validateUser;