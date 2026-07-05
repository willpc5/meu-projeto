import { Router } from 'express';
import { MensagemController } from '../controllers/mensagemController.js';

const routes = Router();
const mensagemController = new MensagemController();

routes.post('/contato', mensagemController.create);

export default routes;