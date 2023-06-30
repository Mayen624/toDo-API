import { body, param, validationResult } from 'express-validator';
import toDoShemma from '../models/toDo.js';
import statusShemmma from '../models/status.js';

const addTask = async (req, res) => {

    try {

        //Validations from  express-validation
        const validations = [
            body('title').notEmpty().trim().withMessage('Title required.')
                .isLength({ min: 2 }).withMessage('Length title must be grater than 5 characters.'),
            body('content').notEmpty().withMessage('Content required.')
                .isLength({ min: 8 }).withMessage('Length content must be grater than 8 characters.'),
            body('status').notEmpty().withMessage('Status required.')
                .isMongoId().withMessage('Incorrect ObjectId format, status must be an mongo ObjectId.'),
            body('commentary').trim()
        ];

        // Check and Validate all the iterated promise from req
        await Promise.all(validations.map(validations => validations.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const statuses = await statusShemmma.find();

        // Checks if the status exist in the current db statuses
        const statusExist = statuses.some((items => items._id.toString() === req.body.status.toString()));

        if (!statusExist) {
            return res.status(400).json({ error: "The status does not match with any existing status." })
        }

        const newTask = new toDoShemma({
            title: req.body.title,
            content: req.body.content,
            id_status: req.body.status,
            commentary: req.body.commentary,
            createdAt: new Date()
        });

        await newTask.save();
        return res.status(200).json({ data: newTask, msg: 'New task successfuly added.' });

    } catch (e) {
        console.log(e);
    }

}

const editTask = async (req, res) => {

    const validations = [
        param('id').notEmpty().trim().withMessage('id param required')
            .isMongoId().withMessage('incorrect ObjectId format, id must be an mongo ObectId'),
        body('title').notEmpty().trim().withMessage('title required'),
        body('content').notEmpty().trim().withMessage('content required'),
        body('id_status').notEmpty().trim().withMessage('status required')
            .isMongoId().trim().withMessage('incorrect ObjectId format, status must be an mongo ObjectId'),
        body('commentary').trim()
    ];

    await Promise.all(validations.map(validations => validations.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const tasks = await toDoShemma.findById(req.params.id);

    if (!tasks) {
        return res.status(404).json({ error: 'task not found' });
    }

    const statuses = await statusShemmma.find();

    // Checks if the status exist in the current db statuses
    const statusExist = statuses.some((items => items._id.toString() === req.body.id_status.toString()));

    if (!statusExist) {
        return res.status(400).json({ error: "The status does not match with any existing status." })
    }

    await toDoShemma.updateOne({ _id: req.params.id }, { title: req.body.title, id_status: req.body.id_status, commentary: req.body.commentary, updatedAt: new Date() });
    const updatedData = await toDoShemma.findById(req.params.id);
    return res.status(200).json({ result: updatedData, msg: 'task successfully updated' })
}

const deleteTask = async (req, res) => {

    const validations = [
        param('id').notEmpty().trim().withMessage('id param required.')
            .isMongoId().withMessage('incorrect ObjectId format, id must be an mongo ObjectId')
    ];

    await Promise.all(validations.map(validations => validations.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const toDelete = await toDoShemma.findById(req.params.id);

    if(!toDelete){
        return res.status(404).json({error: 'Not found!'})
    }
    await toDoShemma.deleteOne({ _id: req.params.id });
    return res.status(200).json({ data: toDelete, msg: `${dataDeleted.title} task successfuly deleted.` })
}



export const toDoController = { addTask, editTask, deleteTask };