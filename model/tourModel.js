const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { number } = require('prop-types');
dotenv.config({ path: `${__dirname}/../config.env` });
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connected');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour name must be exist'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'tour must have a duration'],
  },
  ratingsAvarge: {
    type: Number,
    default: 4,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'tour must have a group'],
  },
  difficulty: {
    type: String,
    required: [true, 'must be exist'],
  },
  summary: {
    type: String,
    required: [true, 'must be exist'],
  },
  description: {
    type: String,
    required: [true, 'must be exist'],
    trim: true,
  },
  imageCover: {
    type: String,
    requried: [true, 'must be exist'],
  },
  images: {
    type: [String],
  },
  startDates: {
    type: [Date],
  },
  price: {
    type: Number,
    required: [true, 'the price must be added'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
