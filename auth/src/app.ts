import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
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
    secure: process.env.NODE_ENV !== 'test'
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

export { app };