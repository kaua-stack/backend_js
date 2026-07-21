import express from "express";
import clienteController from "../controllers/clienteController.js";
import validateCliente from "../middlewares/clientMiddleware.js";
import {authenticationToken, adminRole} from "../middlewares/authLoginMiddleware.js";
const routeClientes = express.Router();


routeClientes.get("/",authenticationToken, adminRole("admin,vendedor,gerente,"), clienteController.getAllClientes);
routeClientes.get("/email/:email", clienteController.clienteByEmail);

routeClientes.get("/:id", authenticationToken, adminRole("admin,vendedor,gerente,"),clienteController.getClienteById);

routeClientes.post("/",authenticationToken, adminRole("admin,vendedor,gerente,"), validateCliente, clienteController.storeCliente);
routeClientes.put("/:id",authenticationToken, adminRole("admin,vendedor,gerente,"), validateCliente, clienteController.updateCLienteById);
routeClientes.delete("/:id",authenticationToken, adminRole("admin,gerente,"), clienteController.removeCliente);


export default routeClientes;