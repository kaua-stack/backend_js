import express from "express";
import compraController from "../controllers/compraController.js";
import validateCompra from "../middlewares/compraMiddleware.js";

const routeCompras = express.Router();

routeCompras.get("/", compraController.getAllCompras);
routeCompras.get("/:id", compraController.getComprasById);
routeCompras.post("/", validateCompra, compraController.addCompra);
routeCompras.put("/:id", validateCompra, compraController.updateCompra);
routeCompras.delete("/:id", compraController.deleteCompra);

export default routeCompras;