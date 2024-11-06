const express = require('express');
const router = express.Router();
const userController = require(`${__dirname}/../controller/userController`);

router.route('/').get(userController.allUsers).post(userController.addNewUser);

router
  .route('/:id')
  .get(userController.user)
  .patch(userController.upadatUserData)
  .delete(userController.deleteUser);
module.exports = router;
