import { gql } from '@apollo/client'

const GET_User = gql`
  query getUser(
    $_id: String!
  ){
    getUser( _id: $_id){
      name
      image
    }
  }
`

export { GET_User }