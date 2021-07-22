import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username:$username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const ADD_REVIEW= gql`
    mutation addReview($gameTitle: String, $reviewText: String!, $videoGameId: String!, $rating: Int!) {
        addReview(gameTitle:$gameTitle, reviewText:$reviewText, videoGameId:$videoGameId,  rating:$rating) {
            _id
        gameTitle
        reviewText
        videoGameId
        rating
        username
        createdAt
        }
    }
`

export const DELETE_REVIEW= gql`
    mutation deleteReview($reviewID: ID) {
        deleteReview(reviewID: $reviewID) {
            _id
        reviewText
        videoGameId
        rating
        username
        createdAt
        }
    }
`