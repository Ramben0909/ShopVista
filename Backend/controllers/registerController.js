// registerController.js
import { comparePassword, hashedPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body; // Corrected the spelling of 'password'

    if (!name) return res.send("Name is required");
    if (!email) return res.send("Email is required");
    if (!phone) return res.send("Phone is required");
    if (!address) return res.send("Address is required");
    if (!password) return res.send("Password is required");

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please log in.",
      });
    }

    const hashpassword = await hashedPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashpassword, // Corrected field name
      address,
      phone,
    }).save();

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to register",
      error,
    });
  }
};

export const loginController =async(req,res)=>{
   try {
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(404).send({
        success:"False",
        message:"Email or password invalid",

      });
    }
     
    const exist = await  userModel.findOne({email});
    if(!exist){
      return res.status(404).send({
        success:"failed",
        message:"Email not found"
      })
    }

    const match = await comparePassword(password,exist.password);

    if(!match){
      return res.status(200).send({
        success:"failed",
        message:"Password doesnt match"
      });
    }

    const token = await JWT.sign({_id:exist._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.status(200).send({
      success:"Successful",
      message:"Loged in",
      user:{
        name:exist.name,
        email:exist.email,
        address:exist.address,
        phone:exist.phone,
      },
      token
    });

   }catch(error){
    console.log(error);
    res.status(400).send({
      success:"false",
      message:"Log in failed",
      error
      });
   }
}

//forgotPasswordController
export const forgotPasswordController =async(req,res) =>{
  try {
    const {email,answer, newPassword} =req.body
    if(!email){
      return res.status(400).send({message:'Email is required'})
    }
    if(!answer){
      return res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
      return res.status(400).send({message:'New Password is required'})
    }
    //check
    const user = await userModel.findOne({email,answer})
    //validation
    if(!user){
      return res.status(404).send({
        success:false,
        message: 'Wrong Email or Answer'
      })
    }
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password: hashed});
    res.status(200).send({
      success: true,
      message:'Password Reset Successfully',
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
  }
};

export const testController = async(req,res) =>{
    console.log("Secure netWork");
}
