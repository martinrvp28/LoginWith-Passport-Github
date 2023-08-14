import mongoose from "mongoose";

export const connectionString = 'mongodb+srv://admin:admin07@cluster0.iuoev0j.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Conectados a la base de datos de MongoDb!');
} catch (error) {
    console.log(error);
}