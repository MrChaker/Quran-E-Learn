import cloudinary from "cloudinary"
import User from '../models/user'
type ImageArgs ={
  user_id: string,
  file: string,
  public_id: string
}

const resolvers = {
  Query: {

  },
  Mutation:{
    updateImage: async (_: null, args: ImageArgs) =>{
      const uploadPreset: string = process.env.CLOUD_ASSET || '';
      
      await cloudinary.v2.uploader.destroy(args.user_id);
      const result = await cloudinary.v2.uploader.unsigned_upload(args.file, uploadPreset , { public_id: `${args.user_id}` });

      await User.findByIdAndUpdate(args.user_id, { image: result.secure_url}).catch( err => console.log(err))
      return result.secure_url
    }
  }
}

export default resolvers