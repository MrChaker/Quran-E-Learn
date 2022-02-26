import cloudinary from "cloudinary"
import User from '../models/user'
type ImageArgs ={
  user_id: string,
  file: string,
  public_id: string
}

const resolvers = {
  Query: {
    getUser: async (_:null, args: { _id: string } ) =>{
      const user = await User.findById(args._id)
      return user
    }
  },
  Mutation:{
    updateImage: async (_: null, args: ImageArgs) =>{
      const uploadPreset: string = process.env.CLOUD_ASSET || '';
      
      await cloudinary.v2.uploader.destroy(args.user_id);

      const result = await cloudinary.v2.uploader.upload(args.file , { public_id: `${args.user_id}`,folder: 'Quran/', invalidate: true, faces: true })

      await User.findByIdAndUpdate(args.user_id, { image: result.secure_url}).catch( err => console.log(err))
      return result.secure_url
    }
  }
}

export default resolvers