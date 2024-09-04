import { Router } from 'express';
import { registerUser, getUsers } from '../controllers/userController';

const router: Router = Router();

router.post('/register', registerUser);
router.get('/', getUsers);

export default router;
