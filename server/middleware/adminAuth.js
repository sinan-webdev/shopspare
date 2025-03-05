import jwt  from "jsonwebtoken"


export function adminMiddleware(req,res,next){
    
    try {
        const token = req.headers.authorization.split(' ')[1]

        
        if(!token){
            return res.json({
                success:true,
                message:'Not authorized login again'
            })
        }
        
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken === process.env.ADMIN_EMAIL){
            return res.json({
                success:true,
                message:'Not authorized login again'
            })
        }
        next()
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}