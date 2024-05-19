import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.ts';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port => ${PORT}`);
});