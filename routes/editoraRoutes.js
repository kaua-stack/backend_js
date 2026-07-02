import express from "express";
import editoraController from "../controllers/editoraController.js";
import validateEditora from "../middlewares/editoraMiddleware.js";

const routeEditoras = express.Router();

routeEditoras.get("/", editoraController.getAllEditoras);
routeEditoras.get("/:id", editoraController.getEditoraById);
routeEditoras.post("/", validateEditora, editoraController.addEditora);
routeEditoras.put("/:id", validateEditora, editoraController.updateEditora);
routeEditoras.delete("/:id", editoraController.deleteEditora);

export default routeEditoras;