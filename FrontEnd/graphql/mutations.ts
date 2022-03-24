import { gql } from '@apollo/client'

const UPDATE_Image = gql`
  mutation updateImage(
    $user_id: String!
    $file: String!,
  ){
    updateImage(user_id: $user_id, file: $file)
  }
`
const CREATE_Request = gql`
  mutation createRequest(
    $userID: String,
    $message: String,
    $cv: String
  ){
    createRequest(userID: $userID, message: $message, cv: $cv){
      _id
    }
  }
`

export { UPDATE_Image, CREATE_Request }