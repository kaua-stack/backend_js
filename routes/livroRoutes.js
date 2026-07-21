import express from "express";
import livroController from "../controllers/livroController.js";
import validateLivro from "../middlewares/livroMiddleware.js";
import {authenticationToken, adminRole} from "../middlewares/authLoginMiddleware.js";
const routeLivros = express.Router();

routeLivros.get("/", authenticationToken, adminRole("admin,vendedor,gerente,"),livroController.getAllLivros);
routeLivros.get("/:id",authenticationToken, adminRole("admin,vendedor,gerente,"), livroController.getLivroById);
routeLivros.post("/", authenticationToken, adminRole("admin,vendedor,gerente,"),validateLivro, livroController.addLivro);
routeLivros.put("/:id", authenticationToken, adminRole("admin,vendedor,gerente,"),validateLivro, livroController.updateLivroById);
routeLivros.delete("/:id", authenticationToken, adminRole("admin,gerente,"), livroController.deleteLivroById);

export default routeLivros;