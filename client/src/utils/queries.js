import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me{
      _id
      username
      email
      reviews{
        _id
        reviewText
        gameTitle
        rating
        createdAt
        comments{
          commentBody
          createdAt
        }
      }
      friends{
        _id
        username
      }
      friendCount
    }
  }
`;

export const QUERY_ALL_REVIEWS= gql`
  query{
    allreviews{
      _id
      gameTitle
      reviewText
      videoGameId
      rating
      username
      createdAt
      comments{
        _id
        commentBody
      }
    }
  }
`
export const FIND_USER= gql`
  query getSingleUser($username: String!) {
    user(username: $username) {
      _id
      username
    }
  }
`

export const QUERY_MY_FRIENDS = gql`
  query{
    me{
      _id
      username
      friends{
        _id
        username
        reviews{
          reviewText
          createdAt
          gameTitle
        }
      }
      friendCount
    }
  }
`;