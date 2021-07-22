import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me{
        _id
        username
        email
      }
  }
`;

export const QUERY_ALL_REVIEWS= gql`
  query{
    allreviews{
      _id
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