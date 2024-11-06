const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require(`${__dirname}/../../model/tourModel.js`);

dotenv.config({ path: `${__dirname}/../../config.env` });

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('done!');
  });

//prettier-ignore
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('data has been loaded in db');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data has been deleted from db');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// تشغيل الدوال حسب المدخلات
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
