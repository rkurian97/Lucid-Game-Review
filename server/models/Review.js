const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: 'You need to leave a review!',
      minlength: 1,
      maxlength: 280
    },
    videoGameId: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

reviewSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Review = model('Review', reviewSchema);

module.exports = Review;