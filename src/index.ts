import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.ts';
import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port => ${PORT}`);
});