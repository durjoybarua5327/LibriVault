import User from "../model/user_model.js";
import bcryptjs from "bcryptjs"

export const SignUp= async (req, res)=>{
    try {
        const {username , email, password} = req.body
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashpassword = await bcryptjs.hash(password,10)
        const createdUser = new User({
            username:username ,
             email:email,
              password:hashpassword
            })
        await createdUser.save()
        res.status(200).json({message:'User created successfully'})
    } catch (error) {
        console.log("Error", error)
        
    }
}

export const Login =async(req, res )=>{
    try {
        const {email, password}= await req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful", user });

        
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}