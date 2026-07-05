import { Router } from 'express';
import { MensagemController } from '../controllers/mensagemController.js';

const routes = Router();
const mensagemController = new MensagemController();

routes.post('/contato', mensagemController.criar);       
routes.get('/contato', mensagemController.listar);        
routes.put('/contato/:id', mensagemController.atualizar); 
routes.delete('/contato/:id', mensagemController.deletar); 

export default routes;