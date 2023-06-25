import {Router} from 'express'
import {mainController} from '../controllers/main.controller.js';
const router = Router();
const toDoController = mainController.toDoController;

router.post('/', toDoController.addTask);

router.put('/edit/:id', toDoController.editTask);

router.delete('/delete/:id', toDoController.deleteTask);

export default router;

