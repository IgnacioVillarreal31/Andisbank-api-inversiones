import { Router } from 'express';
import { getInvestments, getInvestment, postInvestmentAdmin, postBuyInvestmentUser, postSellInvestmentUser, deleteInvestmentAdmin, putInvestmentAdmin, getUserInvestment} from '../controllers/investmentController';
import { rateLimiterFixedWindow } from '../middlewares/rateLimiter';

const router: Router = Router();

router.get('/getInvestments', rateLimiterFixedWindow, getInvestments);
router.get('/getInvestment/:idInvestment', rateLimiterFixedWindow, getInvestment);
router.post('/postInvestmentAdmin', rateLimiterFixedWindow, postInvestmentAdmin);
router.post('/postBuyInvestmentUser', postBuyInvestmentUser);
router.post('/postSellInvestmentUser', postSellInvestmentUser);
router.delete('/deleteInvestmentAdmin/:idInvestment', deleteInvestmentAdmin);
router.put('/putInvestmentAdmin/:idInvestment', putInvestmentAdmin);
router.get('/getUserInvestment/:username', getUserInvestment);

export default router;
