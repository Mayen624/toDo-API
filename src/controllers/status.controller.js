import statusShemmma from '../models/status.js';
import {body, param, validationResult} from 'express-validator';

const addStatus = async (req,res) => {
   
    try {

        const validations = [
            
            body('name').notEmpty().trim().withMessage('Name required.')
            .not().isNumeric().withMessage('Numeric characters are not allowed.')
            .isLength({min: 4}).withMessage('Length name must be grater than 4 characters.')
        ];

        const statuses = await statusShemmma.find({status: req.body.name});

        if(statuses.length > 0){
            throw new Error('Name status arleady in use.');
        }

        await Promise.all(validations.map(validations => validations.run(req))); 

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const newStatus = new statusShemmma({
            status: req.body.name,
            createdAt: new Date()
        });

        await newStatus.save();
        return res.status(200).json({result: newStatus, msg: 'New status successfuly added.'});
    } catch (e) {

        return res.status(400).json({error: e.message})
    }
}

const editStatus = async (req, res) => {
    
    try{
        const validations = [
            param('id').notEmpty().trim().withMessage('Something wrong happend.')
            .isMongoId().withMessage('id param must be an mongo ObjectId.'),
            body('status').notEmpty().trim().withMessage('Status name required')
        ];

        await Promise.all(validations.map(validations => validations.run(req)));

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }

        //Get the status by id if exist
        const status = await statusShemmma.findById(req.params.id);

        //Verify if the status searched by id exist
        if(!status){
            return res.status(404).json({error: 'Status not found'});
        }
        
        await statusShemmma.updateOne({_id: req.params.id}, {status: req.body.status, updatedAt: new Date()});
        const updatedData = await statusShemmma.findById(req.params.id);
        return res.status(200).json({data: updatedData, msg: 'Status updated.'})

    }catch(e){
        console.log(e)
    }
}

const deleteStatus = async (req, res) => {
    
    const validation = [
        param('id').notEmpty().trim().withMessage('id param required.')
        .isMongoId().withMessage('id must be an mongo ObjectId.')
    ];

    await Promise.all(validation.map(validations => validations.run(req)));

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors});
    }

    const status = await statusShemmma.findById({_id: req.params.id});
    await statusShemmma.deleteOne({_id: req.params.id});
    return res.status(200).json({result: status, msg: `${status.status} status successfully deleted.`})
}

export const statusController = {addStatus, editStatus, deleteStatus};