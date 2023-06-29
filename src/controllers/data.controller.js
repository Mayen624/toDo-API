import toDoShemma from '../models/toDo.js';
import statusShemma from '../models/status.js';

const showData = async (req,res) => {

    //Get all the tasks from database
    const tasks = await toDoShemma.find();
    //Get all the statuses from database
    const statuses = await statusShemma.find();

    res.status(200).json({data: {tasks, statuses}});
}


export const dataController = {showData}