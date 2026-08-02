import { Router } from 'express';
import { MensagemController } from '../controllers/mensagemController.js';
import { AuthController } from '../controllers/AuthController.js';
import { autenticarAdmin } from '../middlewares/authMiddleware.js';

const routes = Router();
const mensagemController = new MensagemController();
const authController = new AuthController();

// Rotas de Autenticação
routes.post('/login', authController.login);
routes.post('/logout', authController.logout);
routes.get('/me', authController.me);

// Rota Pública (Inscrição do formulário)
routes.post('/contato', mensagemController.criar);

// Rotas Protegidas (Exclusivas do Admin logado)
routes.get('/contato', autenticarAdmin, mensagemController.listar);
routes.put('/contato/:id', autenticarAdmin, mensagemController.atualizar);
routes.delete('/contato/:id', autenticarAdmin, mensagemController.deletar);

export default routes;