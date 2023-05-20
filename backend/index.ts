import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import { dbName } from './database/constants';

// Express Route
import userRoute from './routes/user.route';
import accountingProviderRoute from './routes/accounting.route';
import decisionEngineRoute from './routes/decisionEngine.route';

// Connecting to MongoDB Database
mongoose
  .connect(dbName)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/users', userRoute);
app.use('/accountingProvider', accountingProviderRoute);
app.use('/decisionEngine', decisionEngineRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// 404 Error
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
};

app.use(errorHandler);

export default app;
