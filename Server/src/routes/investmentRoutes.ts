import { Router } from 'express';
import { createInvestment, getInvestmentsByUser, dos } from '../controllers/investmentController';

const router: Router = Router();

router.get('/', dos);
router.post('/', createInvestment);
router.get('/:userId', getInvestmentsByUser);

export default router;
