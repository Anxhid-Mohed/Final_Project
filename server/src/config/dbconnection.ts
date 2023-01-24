import mongoose,{ConnectOptions} from 'mongoose';


const connectDb = async (DATABASE_URL:string) => {
    
    mongoose.set("strictQuery", false);
        try{
            const DB_OPTIONS ={dbName:'Main_Project'}
            await mongoose.connect(DATABASE_URL,DB_OPTIONS )
            console.log('connected successfully..');
        }catch(error){
            console.log(error);
        }
    }

export default connectDb;