const jwt=require('jsonwebtoken')
exports.identifier=(req,res,next)=>{
    let token;
    if(req.headers.client==='not-browser')
    {
        token=req.headers.authorization
    }else{
        token=req.cookies['Authorization']
    }

    if(!token){
        return res.status(403).json({success:false,message:'Unauthorized'});
    }

    try{
        // console.log(token);
        const jwtVerified=jwt.verify(token,process.env.TOKEN_SECRET);
        
        if(jwtVerified){
            req.user=jwtVerified;
            next();
        }
        else{
            throw new Error('error in the token');
        }
    }catch(error){
        console.log(error);
        res.status(403).json({ success: false, message: 'Token is not valid' });
    }
}