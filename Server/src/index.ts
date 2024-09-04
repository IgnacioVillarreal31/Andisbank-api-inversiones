import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

const saludoHandler = (req: Request, res: Response, next: NextFunction): void => {
  const nombre: string = req.query.nombre as string;
  res.send(`Hola, ${nombre || 'API con TypeScript y Express!'}`);
};

app.get('/saludo', saludoHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
