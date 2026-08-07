import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from './routes/routes.js';

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT !== undefined;

if (isProduction) {
  app.set('trust proxy', 1);
}

// 1. Configuração do CORS
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:8080',
  'http://localhost:5173',
  'https://willpc5.github.io',
  'https://willpc5.github.io/meu-projeto'
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite chamadas sem origin (curl, postman, etc)
    if (!origin) return callback(null, true);

    // Permite se a origem estiver na lista ou se vier do github.io
    if (allowedOrigins.includes(origin) || origin.startsWith('https://willpc5.github.io')) {
      return callback(null, true);
    }

    return callback(new Error('Bloqueado por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200 // Importante para navegadores antigos/proxies responderem 200 no OPTIONS
}));

// 2. Garante o parse de JSON
app.use(express.json());

// 3. Configuração da Sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua_chave_secreta_aqui_123',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2
  }
}));

declare module 'express-session' {
  interface SessionData {
    usuarioId: string;
  }
}

// 4. Rotas da Aplicação
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'Servidor ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});