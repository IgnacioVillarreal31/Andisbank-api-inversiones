import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import investmentRoutes from './routes/investmentRoutes';

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/investments', investmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
