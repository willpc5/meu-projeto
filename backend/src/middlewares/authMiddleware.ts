import { Request, Response, NextFunction } from 'express';

export function autenticarAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.usuarioId) {
    return next();
  }
  return res.status(401).json({ error: 'Não autorizado. Faça login primeiro.' });
}