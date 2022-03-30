import mongoose from "mongoose"

type fields = {
  email: string,
  phone?: string,
  name: string
}
export type ReturnType = {
  field: 'Email' | 'Name' | 'Phone',
  message: string
}
export const uniqueValidator = async (fields: fields, model: mongoose.Model<any>) => {

  const alreadyExistsUser = await model.findOne({$or : [{email: fields.email}, {name: fields.name} ]})

  if (!alreadyExistsUser) return undefined
  let result : ReturnType[] = [];
  if ( alreadyExistsUser.email === fields.email) {
    result.push({ field: 'Email', message:'الايميل مستعمل من قبل'})
  }
  if ( alreadyExistsUser.name === fields.name) {
    result.push({ field: 'Name', message:'الاسم مستعمل من قبل'})
  }
  /* if ( alreadyExistsUser.phone === fields.phone) {
    result.push({ field: 'Phone', message:'رقم الهاتف مستعمل من قبل'})
  } */
  return result
}