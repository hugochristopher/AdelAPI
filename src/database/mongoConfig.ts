import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
console.log('process.env.MONGO_URL', process.env.MONGO_URL)
try {
  mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => console.log('Mongo connected Succesfully!'))
} catch (error) {
  console.log('Error trying to connect with Mongo', error)
}

mongoose.connection.on('error', (err) => {
  console.error(err)
})

