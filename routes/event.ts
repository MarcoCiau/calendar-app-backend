import { Router} from "express";
import * as eventController from "../controllers/event";
import * as authValidator from '../middlewares/auth.validator';
import * as eventValidator from '../middlewares/event.validator';
const router = Router();

router.get('/', authValidator.validateJWT, eventValidator.getAllRules(), eventValidator.result, eventController.getEvents);
router.get('/:id', authValidator.validateJWT, eventValidator.mongoIdRule(), eventValidator.result, eventController.getEvent);
router.post('/', authValidator.validateJWT, eventValidator.createRules(), eventValidator.result, eventController.createEvent);
router.put('/:id', authValidator.validateJWT, eventValidator.mongoIdRule(), eventValidator.updateRules(), eventValidator.result, eventController.updateEvent);
router.delete('/:id', authValidator.validateJWT, eventValidator.mongoIdRule(), eventValidator.result, eventController.deleteEvent);

export default router;