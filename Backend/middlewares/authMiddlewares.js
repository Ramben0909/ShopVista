import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const requireSignIn=(req,res,next)=>{
    try{
       const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
       );
       req.user = decode;
       next();
    }catch(error){
       console.log(error);
    }
};

export const isAdmin = (req,res,next)=>{
    try{
      const user = userModel.findById(req.user._id);
      if(user.role !==1){
        return res.status(401).send({
            success:"Failed",
            messege:"Unauthorized access"
        });
      }else{
        next();
      }
    }catch(error){
       console.log(error);
       res.status(401).send({
        success:"failed",
        messege:"error in admin middleware",
        error
       })
    }
}