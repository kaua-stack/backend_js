import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routeClientes from "./routes/clienteRoutes.js";
import routeCategorias from "./routes/categoriaRoutes.js";
import routeCompras from "./routes/compraRoutes.js";
import routeEditoras from "./routes/editoraRoutes.js";
import routeLivros from "./routes/livroRoutes.js";
import routeUsers from "./routes/userRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import enderecoRouter from "./routes/enderecoRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());
// obrigatorio para o cookie funcionar no frontend, o cors deve ser configurado para aceitar as credenciais (cookies) e o cookie-parser deve ser usado para ler os cookies no backend
app.use(cors({
    origin: "http://localhost:6050",
    credentials: true,
}));
app.use(cookieParser());


const PORT = process.env.PORT_SERVER || 6050;

app.use("/clientes", routeClientes);
app.use("/categorias", routeCategorias);
app.use("/editoras", routeEditoras);
app.use("/livros", routeLivros);
app.use("/compras", routeCompras);
app.use("/users", routeUsers);
app.use("/auth", loginRoute);
app.use("/endereco", enderecoRouter);

app.listen(PORT, () => {
    return console.log(`Servidor rodando http://localhost:${PORT}`);
});