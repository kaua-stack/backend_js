import express from 'express';
import categoriaController from '../controllers/categoriaController.js';
//desconstrutor funciona no import quando precisa somente de uma função ou objeto específico, sem precisar importar o módulo inteiro.
import validateCategoria from '../middlewares/categoriaMiddleware.js';

const routeCategorias = express.Router();

routeCategorias.get('/', categoriaController.getAllCategorias);
routeCategorias.get('/:id', categoriaController.getCategoriaById);
routeCategorias.post('/', validateCategoria, categoriaController.addCategoria);
routeCategorias.put('/:id', validateCategoria, categoriaController.updateCategoria);
routeCategorias.delete('/:id', categoriaController.deleteCategoria);

export default routeCategorias;