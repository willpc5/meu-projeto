import { Request, Response } from 'express';
import prisma from '../prismaClient.js';

export class MensagemController {
  // 1. CREATE 
  async criar(req: Request, res: Response) {
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
      return res.status(500).json({ error: 'Erro interno ao salvar.' });
    }
  }

  // 2. READ 
  async listar(req: Request, res: Response) {
    try {
      const mensagens = await prisma.mensagem.findMany({
        orderBy: { createdAt: 'desc' } // Traz as mais recentes primeiro
      });
      return res.json(mensagens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar mensagens.' });
    }
  }

  // 3. UPDATE 
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, mensagem } = req.body;

      const mensagemAtualizada = await prisma.mensagem.update({
        where: { id: id as string },
        data: { nome, mensagem }
      });

      return res.json(mensagemAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar mensagem. Verifique se o ID existe.' });
    }
  }

  // 4. DELETE 
  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.mensagem.delete({
        where: { id: id as string }
      });

      return res.status(204).send(); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar mensagem. Verifique se o ID existe.' });
    }
  }
}