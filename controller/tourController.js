const fs = require('fs');
const Tour = require(`${__dirname}/../model/tourModel.js`);
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, (err) => {
    console.log(err.message);
  }),
);

exports.allTours = async (req, res) => {
  try {
    console.log(req.query);
    const reqObj = { ...req.query };
    const filterData = ['sort', 'page', 'limit', 'fields'];
    //filtering the request from these queries
    filterData.forEach((el) => delete reqObj[el]);
    //advanced filter
    let quryStirng = JSON.stringify(reqObj);
    quryStirng = quryStirng.replace(/\b(lte|lt|gt|gte)\b/g, (x) => `$${x}`);
    const query = Tour.find(JSON.parse(quryStirng));
    //to possible configration
    const tour = await query;
    res.status(201).json({
      status: 'success',
      toursNumber: tour.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'faild',
      error: err,
    });
  }
};
exports.addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'succes',
      dataOfNewTour: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      message: err,
    });
  }
};
exports.getSpecificTour = async (req, res) => {
  try {
    const neededTour = await Tour.find({ _id: req.params.id });
    //const neededTour = await Tour.findById( req.params.id );comment works tooo(easy way)!

    res.status(200).json({
      status: 'success',
      toursNumber: tour.length,
      data: {
        neededTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Not Found',
      error: err,
    });
  }
};
exports.updateTourData = async (req, res) => {
  try {
    const neededTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'updated',
      data: {
        tour: neededTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      errorMessage: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 'deleted',
      restOfData: await Tour.find(), //comment return the rest of document,
      //restOfdata: tour comment return the deleted data
      //restOfdata : null comment will return nothing!
    });
  } catch (err) {
    res.status(400).json({
      status: 'faild',
      errorMessage: err,
    });
  }
};
