import express from "express";
import livroController from "../controllers/livroController.js";

import validateLivro from "../middlewares/livroMiddleware.js";

const routeLivros = express.Router();

routeLivros.get("/", livroController.getAllLivros);
routeLivros.get("/:id", livroController.getLivroById);
routeLivros.post("/", validateLivro, livroController.addLivro);
routeLivros.put("/:id", validateLivro, livroController.updateLivroById);
routeLivros.delete("/:id", livroController.deleteLivroById);

export default routeLivros;