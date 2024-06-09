const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackControllers');

router.get('/:userId', feedbackController.getFeedbackById);
router.post('/:userId', feedbackController.createFeedback);

module.exports = router;