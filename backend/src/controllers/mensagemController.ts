import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

export class MensagemController {
  async create(req: Request, res: Response) {
    try {
      const { nome, mensagem } = req.body;

      if (!nome || !mensagem) {
        return res.status(400).json({ error: 'Nome e mensagem são obrigatórios.' });
      }

      const novaMensagem = await prisma.mensagem.create({
        data: { nome, mensagem }
      });

      return res.status(201).json(novaMensagem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}