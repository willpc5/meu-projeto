import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from './routes/routes.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:8080',
    'https://willpc5.github.io'
  ],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'sua_chave_secreta_aqui_123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2 // 2 horas
  }
}));

// Tipagem da sessão do Express
declare module 'express-session' {
  interface SessionData {
    usuarioId: string;
  }
}

app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.json('Servidor ok');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});