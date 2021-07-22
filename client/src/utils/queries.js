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