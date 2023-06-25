import mongoose from 'mongoose';
import { env } from '../../env.js';


export const connection = async () => {

    let URI = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${env.DB_NAME}.zmunzgj.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DB connected!')
    } catch (e) {
        console.log(e)
    }
}


