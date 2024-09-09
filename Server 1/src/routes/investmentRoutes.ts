import { Router } from 'express';
import { getInvestments, getInvestment, postInvestmentAdmin, postBuyInvestmentUser, postSellInvestmentUser, deleteInvestmentAdmin, putInvestmentAdmin, getUserInvestment} from '../controllers/investmentController';

const router: Router = Router();

router.get('/getInvestments', getInvestments);
router.get('/getInvestment/:idInvestment', getInvestment);
router.post('/postInvestmentAdmin', postInvestmentAdmin);
router.post('/postBuyInvestmentUser', postBuyInvestmentUser);
router.post('/postSellInvestmentUser', postSellInvestmentUser);
router.delete('/deleteInvestmentAdmin/:idInvestment', deleteInvestmentAdmin);
router.put('/putInvestmentAdmin/:idInvestment', putInvestmentAdmin);
router.get('/getUserInvestment/:username', getUserInvestment);

export default router;
