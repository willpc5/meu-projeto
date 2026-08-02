import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prismaClient.js';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      req.session.usuarioId = usuario.id;
      return res.json({ message: 'Login realizado!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor.' });
    }
  }

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: 'Erro ao sair.' });
      res.clearCookie('connect.sid');
      return res.json({ message: 'Sessão encerrada.' });
    });
  }

  async me(req: Request, res: Response) {
    if (!req.session.usuarioId) {
      return res.status(401).json({ autenticado: false });
    }
    return res.json({ autenticado: true });
  }
}