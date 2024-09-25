import { Router } from 'express';
import { getInvestments, getInvestment, postInvestmentAdmin, postBuyInvestmentUser, postSellInvestmentUser, deleteInvestmentAdmin, putInvestmentAdmin, getUserInvestment} from '../controllers/investmentController';
import { rateLimiterFixedWindow, rateLimiterSlidingWindow, rateLimiterConcurrency, rateLimiterTokenBucket } from '../middlewares/rateLimiter';

const router: Router = Router();

router.get('/getInvestments', rateLimiterFixedWindow, getInvestments);
router.get('/getInvestment/:idInvestment', rateLimiterFixedWindow, getInvestment);
router.post('/postInvestmentAdmin', rateLimiterFixedWindow, postInvestmentAdmin);
router.post('/postBuyInvestmentUser', rateLimiterSlidingWindow, postBuyInvestmentUser);
router.post('/postSellInvestmentUser', rateLimiterSlidingWindow, postSellInvestmentUser);
router.delete('/deleteInvestmentAdmin/:idInvestment', rateLimiterConcurrency, deleteInvestmentAdmin);
router.put('/putInvestmentAdmin/:idInvestment', rateLimiterConcurrency, putInvestmentAdmin);
router.get('/getUserInvestment/:username', rateLimiterTokenBucket, getUserInvestment);

export default router;
