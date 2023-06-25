import validator from 'validator';
import toDoShemma from '../models/toDo.js';

const addTask = async (req,res) => {
    const {title, content, idStatus, commentary} = req.body;

    

}

const editTask = async (req,res) => {

}

const deleteTask = async (req,res) => {

}



export const toDoController = {addTask, editTask, deleteTask};