require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDatabase = require('./helpers/initDatabase');
const { handleErrors } = require('./controllers/errorController');
const userRouter = require('./routers/userRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', userRouter);
app.use(handleErrors);

app.listen(PORT, async () => {
  await initDatabase();
  console.log('Server started listening on port', PORT);
});
