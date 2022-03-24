import  mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
interface UserModel extends Model<any> {
  loginAPI(email: string, Password: string): any
}

const UserSchema = new mongoose.Schema({
    name:  {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        validate : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    image: String,
    oAuthID: String,
    password: String,
    roles:{
        student: { type: Boolean, default: true },
        teacher:{ type: Boolean, default: false },
        admin: { type: Boolean, default: false }
    }
})
UserSchema.pre('save', async function(next){
    if( this.password){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// log in function
UserSchema.static( 'loginAPI' , async function loginAPI(Email, Password){
    const user = await this.findOne({ email: Email });
    if (user){
       const pass = await bcrypt.compare(Password, user.password);
       if(pass){
            return user;
       }
       throw Error('Password incorrect')
    }
    throw Error ('Email incorrect')
}
)


const User: UserModel = mongoose.model<any, UserModel>('User', UserSchema);
export default User;
