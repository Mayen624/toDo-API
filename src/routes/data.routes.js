import { Router } from 'express';
import {mainController} from '../controllers/main.controller.js';
const router =  Router();
const dataController = mainController.dataController;
const toDoController = mainController.toDoController;
const statusController = mainController.statusController;

router.get('/', dataController.showData);

// Tasks
router.post('/tasks', toDoController.addTask);

router.put('/tasks/edit/:id', toDoController.editTask);

router.delete('/tasks/delete/:id', toDoController.deleteTask);

//Status

router.post('/status', statusController.addStatus);

router.put('/status/edit/:id', statusController.editStatus);

router.delete('/status/delete/:id', statusController.deleteStatus);

export default router;