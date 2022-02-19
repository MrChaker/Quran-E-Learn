import jwt, {Secret} from 'jsonwebtoken'

const jwtSecret: Secret = process.env.JWT_SECRET || '' ;

const CheckAuth = (req: any , res: any, next: any)=>{
    if( req.cookie.jwt ){
        jwt.verify(req.cookies.jwt,jwtSecret, async (err: any )=>{
            if (err) res.redirect('/auth/signup')
            else next();
        })
    }else{
        res.redirect('/auth/signup')
    }
}
export default CheckAuth