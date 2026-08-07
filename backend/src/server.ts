import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from './routes/routes.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT !== undefined;

// OBRIGATÓRIO PARA O RAILWAY: permite que o Express entenda o protocolo HTTPS do proxy
if (isProduction) {
  app.set('trust proxy', 1);
}

// Configuração do CORS
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:8080',
    'https://willpc5.github.io',
    'http://willpc5.github.io'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Configuração do Session ajustada para HTTPS/Produção
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua_chave_secreta_aqui_123',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Avisa o express-session que está atrás do proxy do Railway
  cookie: {
    secure: isProduction, // Em produção vira TRUE (exigido pelo GitHub Pages)
    sameSite: isProduction ? 'none' : 'lax', // OBRIGATÓRIO 'none' para aceitar cookies entre github.io e railway.app
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