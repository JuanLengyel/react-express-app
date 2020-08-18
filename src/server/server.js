import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import { Code } from 'mongodb';

const port = 5000;
const app = express();

app.listen(port, console.log('Server listening on port', port));

// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  await collection.insertOne(task);
};

export const updateTask = async (task) => {
  let { id, name, group, owner, isComplete } = task;
  let db = await connectDB();
  let collection = db.collection('tasks');

  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (owner) {
    await collection.updateOne({ id }, { $set: { owner } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post('/task/new', async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
