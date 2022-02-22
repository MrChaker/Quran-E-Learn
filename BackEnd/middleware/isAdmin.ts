import jwt, {Secret} from 'jsonwebtoken'


const CheckAuth = (req: any , res: any, next: any)=>{
    const jwtSecret: Secret = process.env.JWT_SECRET || '' ;
    if( req.cookie ){
        jwt.verify(req.cookies.jwt,jwtSecret, async (err: any )=>{
            if (err) res.redirect('/auth/login')
            else next();
        })
    }else{
        res.redirect('/auth/signup')
    }
}
export default CheckAuth