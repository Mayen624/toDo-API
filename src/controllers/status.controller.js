import statusShemmma from '../models/status.js';
import {body, validationResult} from 'express-validator';

const addStatus = async (req,res) => {
   
    try {

        const validations = [

            body('name').notEmpty().trim().withMessage('Name required.')
            .isLength({min: 4}).withMessage('Length name must be grater than 4 characters.')
        ];

        await Promise.all(validations.map(validations => validations.run(req))); 

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const newStatus = new statusShemmma({
            status: req.body.name
        });

        await newStatus.save();
        return res.status(200).json({data: newStatus, msg: 'New status successfuly added.'});
    } catch (e) {
        // Manejar cualquier error que ocurra durante las validaciones
        console.error(e);
    }
}

const editStatus = async (req, res) => {
    
}

const deleteStatus = async (req, res) => {
    
}

export const statusController = {addStatus, editStatus, deleteStatus};