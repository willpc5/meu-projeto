import express, {Request, Response} from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.json('Servidor ok');
});

app.listen(3000, () => {
    console.log('Servidor rodando no link http://localhost:3000');
})