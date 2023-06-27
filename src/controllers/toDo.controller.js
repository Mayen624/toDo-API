import {body, validationResult} from 'express-validator';
import toDoShemma from '../models/toDo.js';

const addTask = async (req,res) => {

    try {

        //Validations from  express-validation
        const validations = [
            body('title').notEmpty().trim().withMessage('Title required.')
            .isLength({min: 5}).withMessage('Length title must be grater than 5 characters.'),
            body('content').isEmpty().withMessage('Content required.')
            .isLength({min: 10}).withMessage('Length title must be grater than 10 characters.'),
            body('status').isEmpty().withMessage('Status required.')
            .isLength({min: 5}).withMessage('Length title must be grater than 5 characters.')
            .isMongoId().withMessage('Incorrect ObjectId format, status must be an ObjectId.')
        ];

        // Check and Validate all the iterated promise from req
        await Promise.all(validations.map(validations => validations.run(req))); 

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const newTask = new toDoShemma({
            title: req.body.title,
            conntent: req.body.conntent,
            id_status: req.body.status,
            commentary: req.body.commentary,
            createdAt: new Date()
        });

        await newTask.save();
        return res.status(200).json({data: newTask, msg: 'New task successfuly added.'});

    } catch (e) {
        console.log(e);
    }

}

const editTask = async (req,res) => {

}

const deleteTask = async (req,res) => {

}



export const toDoController = {addTask, editTask, deleteTask};