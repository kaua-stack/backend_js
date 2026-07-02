import express from "express";
import clienteController from "../controllers/clienteController.js";
import validateCliente from "../middlewares/clientMiddleware.js";
import {authenticationToken} from "../middlewares/authLoginMiddleware.js";
const routeClientes = express.Router();

routeClientes.get("/",authenticationToken, clienteController.getAllClientes);
routeClientes.get("/email/:email", clienteController.clienteByEmail);

routeClientes.get("/:id", clienteController.getClienteById);

routeClientes.post("/", validateCliente, clienteController.storeCliente);
routeClientes.put("/:id", validateCliente, clienteController.updateCLienteById);
routeClientes.delete("/:id", clienteController.removeCliente);

export default routeClientes;