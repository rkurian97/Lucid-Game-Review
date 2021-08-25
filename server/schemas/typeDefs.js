const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
        username: String!
        email: String
        friendCount: Int
        reviews: [Review]
        friends: [User]
    }

    type Review {
        _id: ID
        gameTitle: String
        reviewText: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
        rating: Int
        videoGameId: String
    }

    type Comment {
        _id: ID
        commentBody: String
        createdAt: String
        username: String
    }

    type VideoGame{
        name: String
        image: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String): User
        reviews(username: String): [Review]
        review(_id: ID!): Review
        allreviews: [Review]
        videogames(query: String): [VideoGame]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(gameTitle: String, reviewText: String!, videoGameId: String!, rating: Int!): Review
        updateReview(reviewID: ID, reviewText: String!, rating: Int!): Review
        deleteReview(reviewID: ID): Review
        addComment(reviewID: ID!, commentBody: String!): Review
        updateComment(reviewID: ID!, commentID: ID!, commentBody: String!): Review
        deleteComment(reviewID: ID!, commentID: ID!): Review
        addFriend(friendId: ID!): User
        deleteFriend(friendId: ID!): User
      }
`
module.exports = typeDefs;