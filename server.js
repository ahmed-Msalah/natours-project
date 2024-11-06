const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const Tour = require(`${__dirname}/model/tourModel.js`);
const app = require('./app.js');
const { number } = require('prop-types');
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('done!');
  });

//start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log('server is avilablel now !');
});
