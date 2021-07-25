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
      videogames: async (parent, {query})=>{
        let results=[];
        const response = await axios.get(`https://api.rawg.io/api/platforms?key=${process.env.API_KEY}?search_exact=${query}&exclude_additions=true`)
        for(const videogame of response.data.results){
          let obj={image: videogame.image_background}
          results.push(obj)
        }
        return(results)
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
          console.log('CONTEXT!!', context)
  
          console.log('Review we just added', review)
          console.log('updated user w new review', updatedUser)
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
          console.log(commentID);
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
          console.log(commentID);
          const updatedReview= await Review.findByIdAndUpdate(
            { _id: reviewID },
            { $pull: { comments: commentID } },
            { new: true }
          );
          console.log(updatedReview)
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
          console.log(friendId);
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