import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import mongoose, { startSession } from 'mongoose';
import cookieSession from 'cookie-session';
import {currentUserRouter} from './routes/current-user';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout';
import {signUpRouter} from './routes/signup';
import {errorHandler} from './middlewares/error-handler';
import {NotFoundError} from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

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