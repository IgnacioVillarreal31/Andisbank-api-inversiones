import { Router } from 'express';
import { createInvestment, getInvestmentsByUser } from '../controllers/investmentController';

const router: Router = Router();

router.post('/', createInvestment);
router.get('/:userId', getInvestmentsByUser);

export default router;
