import express, { Application } from 'express';
import bodyParser from 'body-parser';
import investmentRoutes from './routes/investmentRoutes';

const app: Application = express();

app.use(bodyParser.json());

app.use('/investments', investmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
