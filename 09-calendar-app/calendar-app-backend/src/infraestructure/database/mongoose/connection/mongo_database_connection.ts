import mongoose from "mongoose";

export class DatabaseConnector{
    async connectToDatabase(mongoURL: string){
    
       try {
        console.log(mongoURL);
        await mongoose.connect(mongoURL);
       } catch (error) {
        console.log(error);
       }

    }
}