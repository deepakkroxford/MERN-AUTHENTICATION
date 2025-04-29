import mongoose from "mongoose";

const dbConnection = async(req,res)=>{
    try{
     await  mongoose.connect(`${process.env.MONGODB_URI}/mernAuth`);
     console.info('Database is Connected ');
    }catch(error){
        console.log(error);
    }
}

export default dbConnection;