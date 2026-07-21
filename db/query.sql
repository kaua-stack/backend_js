USE bd_livrariaonline;

CREATE TABLE tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    Foreign Key (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_phone VARCHAR(20),
    role_id INT NOT NULL,
    user_status BOOLEAN DEFAULT TRUE,
    user_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE Table endereco (
    endereco_id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(150) NOT NULL,
    complemento VARCHAR(255),
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
)

drop table if exists endereco;

INSERT INTO
    roles (role_name)
VALUES ("clientes"),
    ("vendedor"),
    ("gerente"),
    ("admin");

INSERT INTO
    users (
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id
    )
VALUES (
        "João Oliveira",
        "joao_oliveira@email.com",
        "123456",
        "(11) 25143-6521",
        1
    ),
    (
        "Maria Silva",
        "maria_silva@email.com",
        "123456",
        "(11) 25143-6521",
        2
    ),
    (
        "Carlos Pereira",
        "carlos_pereira@email.com",
        "123456",
        "(11) 25143-6521",
        3
    ),
    (
        "Naruto",
        "naruto@email.com",
        "123456",
        "(11) 25143-6521",
        4
    );

SELECT * FROM users;