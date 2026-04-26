const Review = require('../models/review');

// GET REVIEW BY EQUIPMENT
exports.getReviews = async (req, res) => {
  try {
    const data = await Review.find({ equipmentId: req.params.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};