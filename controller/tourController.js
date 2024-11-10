const { error } = require('console');
const fs = require('fs');
const { message } = require('statuses');
const Tour = require(`${__dirname}/../model/tourModel.js`);
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, (err) => {
    console.log(err.message);
  }),
);

exports.allTours = async (req, res) => {
  try {
    //1A)filter
    console.log(req.query);
    const reqObj = { ...req.query };
    const filterData = ['sort', 'page', 'limit', 'fields'];
    //filtering the request from these queries
    filterData.forEach((el) => delete reqObj[el]);
    //1B)advanced filter
    let quryStirng = JSON.stringify(reqObj); //req.qurey work the same way
    quryStirng = quryStirng.replace(/\b(lte|lt|gt|gte)\b/g, (x) => `$${x}`);
    let query = Tour.find(JSON.parse(quryStirng));
    //2)sorting by..
    if (req.query.sort) {
      let sortingQueries = req.query.sort.split(',').join(' ');
      query = query.sort(sortingQueries); //accept obj or string
    } else {
      qurey = query.sort('-_id'); //sort by newest tour
    }

    //3)showing specific fields of the tour
    if (req.query.fields) {
      let neededFields = req.query.fields.split(',').join(' ');
      query = query.select(neededFields);
    } else {
      //empty for now.
    }
    //4)pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5; //tested data not  huge 😁
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numberOfTours = await Tour.countDocuments();
      if (skip > numberOfTours) {
        return res.status(400).json({
          status: 'Not found',
          message: ' page is not exist',
        });
      }
    }
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
