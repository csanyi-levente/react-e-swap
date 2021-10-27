import mongoose, { startSession } from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not configured!');
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Conneted to MongoDB!");
  } catch (err) {
    console.log("error: " + err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
}
start();