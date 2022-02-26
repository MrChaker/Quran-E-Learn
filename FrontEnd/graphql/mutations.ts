import { gql } from '@apollo/client'

const UPDATE_Image = gql`
  mutation updateImage(
    $user_id: String!
    $file: String!,
  ){
    updateImage(user_id: $user_id, file: $file)
  }
`

export { UPDATE_Image }