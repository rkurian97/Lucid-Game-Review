const { AuthenticationError } = require('apollo-server-express');
const { User, Review} = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('reviews')
            .populate('friends')
            .populate({
              path: 'friends',
              populate: {
                path: 'reviews'
              }
            });
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('reviews')
          .populate('friends');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('friends')
          .populate('reviews');
      },
      allreviews: async (parent) => {
        const allReviews = await Review.find({}).sort({ createdAt: -1 });
        return allReviews
      },
      reviews: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Review.find(params).sort({ createdAt: -1 });
      },
      review: async (parent, { _id }) => {
        return Review.findOne({ _id });
      },
      // USing this query to hit API from the backend, because on front end confronted cors policy errors
      videogames: async (parent, {query})=>{
        
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${query}&search_exact`)
        
        // let obj={image: response.data.background_image}
        // return(obj)
        results=[];
        
        for (const game of response.data.results){
          if (game.background_image){
            results.push({
              name: game.name,
              image: game.background_image
            })
          }
        }
        
        return results
      }
    },
  
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addReview: async (parent, args, context) => {
        if (context.user) {
          const review = await Review.create({ ...args, username: context.user.username });
  
         const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { reviews: review._id } },
            { new: true }
          );

          return review;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      updateReview: async (parent, {gameTitle, reviewID, reviewText, rating}, context) => {

        if (context.user) {
          const updatedReview = await Review.findOneAndUpdate(
            {_id: reviewID},
            { gameTitle: gameTitle, reviewText: reviewText, rating: rating, username: context.user.username },
            { new: true, runValidators: true }
          );
  
          return updatedReview;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteReview: async (parent, {reviewID}, context) => {
        if (context.user) {
          const deletedReview = await Review.findOneAndDelete(
            {_id: reviewID}
          );
          
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { reviews: deletedReview._id } },
            { new: true }
          );
  
          return deletedReview;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      addComment: async (parent, { reviewID, commentBody }, context) => {
        if (context.user) {
          const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewID },
            { $push: { comments: { commentBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );
  
          return updatedReview;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      updateComment: async (parent, {reviewID, commentID, commentBody}, context) => {

        if (context.user) {
          await Review.findByIdAndUpdate(
            { _id: reviewID },
            { $pull: { comments: {_id: commentID} } }
          );
          
          const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewID },
            { $push: { comments: { commentBody, username: context.user.username } } },
            { new: true, runValidators: true }
          );

          return updatedReview;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteComment: async (parent, {reviewID, commentID, commentBody}, context) => {

        if (context.user) {
          const updatedReview= await Review.findByIdAndUpdate(
            { _id: reviewID },
            { $pull: { comments: commentID } },
            { new: true }
          );
          return updatedReview;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      addFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteFriend: async (parent, { friendId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { friends: friendId  } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      }
    }
  };
  
  module.exports = resolvers;