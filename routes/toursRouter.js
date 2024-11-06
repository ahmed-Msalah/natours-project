const express = require('express');
//const router = express();//comment not a best practice.
const router = express.Router();
const tourController = require(`${__dirname}/../controller/tourController`);
// router.param('id', tourController.checkID); //comment specific param middlewar check id found or not

router.route('/').get(tourController.allTours).post(tourController.addNewTour);
//comment we can also chaining too
router
  .route('/:id?')
  .patch(tourController.updateTourData)
  .get(tourController.getSpecificTour)
  .delete(tourController.deleteTour);
module.exports = router;
