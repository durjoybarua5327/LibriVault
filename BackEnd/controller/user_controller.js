import User from "../model/user_model";



export const SignUp= async (req, res)=>{
    try {
        const {username , email, password} = req.body
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const createdUser = new User({username , email, password})
        createdUser.save()
        res.status(200).json({message:'User created successfully'})
    } catch (error) {
        console.log("Error", error)
        
    }
}