import express from 'express';
import enderecoController from '../controllers/enderecoController.js';

const enderecoRouter = express.Router();

enderecoRouter.post('/', enderecoController.createEndereco);


export default enderecoRouter;