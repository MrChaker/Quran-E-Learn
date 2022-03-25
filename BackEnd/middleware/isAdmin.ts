import jwt, { Secret} from 'jsonwebtoken'
import User from '../models/user';


const CheckAdmin = (req: any , res: any, next: any)=>{
    const jwtSecret: Secret = process.env.JWT_SECRET || '' ;
    jwt.verify(req.cookies?.jwt,jwtSecret, async (err: any, decoded: any ) =>{
        if (err) res.redirect('/')
        else {
            const user = await User.findById(decoded.id);
            if ( user.roles.admin ){
                next()
            }else{
                res.redirect('/')
            }
        }
    })
}

export default CheckAdmin