import express from 'express';
import mongoose from 'mongoose';
import itemsRouter from './src/routes/ItemsRoutes';
import { serverPort } from './src/config/config';
import dotenv from 'dotenv';
import { itemPath, itemTypePath } from './src/config/consts';
import itemTypesRouter from './src/routes/ItemTypesRoutes';

const app = express();
app.use(express.json());
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('Cannot read Mongo Uri');
  process.exit();
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(itemPath, itemsRouter);
app.use(itemTypePath, itemTypesRouter);

app.listen(serverPort, () => {
  console.log('El servidor está inicializado en el puerto 3000');
});
