import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors'
import './database/mongoConfig'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: `${process.env.FRONT_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port => ${PORT}`);
});

export default app;