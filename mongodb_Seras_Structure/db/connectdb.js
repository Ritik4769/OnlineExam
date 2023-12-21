import mongoose from 'mongoose';

const connectDB = mongoose.connect('mongodb+srv://ritikbhondve:ifHf7ggNcoSuv6fT@cluster0.f1bgwx4.mongodb.net/OnlineExam', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connectDB
  .then(() => {
    console.log('Connected successfully to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

export default connectDB;