import { Router } from 'express';
import * as authController from '../controllers/auth';
import * as authValidator from '../middlewares/auth.validator';
const router = Router();

router.post('/signup', authValidator.rules(), authValidator.result, authController.signup);
router.post('/signin', authValidator.rules(), authValidator.result, authController.signin);
router.post('/refreshToken', authValidator.refreshTokendRules(), authValidator.result,  authController.refreshToken);
export default router;