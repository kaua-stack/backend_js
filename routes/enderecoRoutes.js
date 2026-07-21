import express from 'express';
import enderecoController from '../controllers/enderecoController.js';

const enderecoRouter = express.Router();

enderecoRouter.post('/', enderecoController.createEndereco);

enderecoRouter.delete('/:endereco_id', enderecoController.enderecoDelete);


export default enderecoRouter;