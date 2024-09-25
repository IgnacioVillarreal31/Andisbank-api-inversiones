import express, { Application } from 'express';
import bodyParser from 'body-parser';
import investmentRoutes from './routes/investmentRoutes';
//export { rateLimiter } from './middlewares/rateLimiter';

const app: Application = express();

app.use(bodyParser.json());

app.use('/investments', investmentRoutes);
//app.use(rateLimiter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
