import {Router} from 'express';
import {mainController} from '../controllers/main.controller.js';
const router = Router();
const statusController = mainController.statusController;

router.post('/', statusController.addStatus);

router.put('/edit/:id', statusController.editStatus);

router.delete('/delete/:id', statusController.deleteStatus);

export default router;
