import User from "../model/user_model.js";
import bcryptjs from "bcryptjs"

export const SignUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        
        const hashpassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            email,
            password: hashpassword
        });

        await createdUser.save();
        res.status(201).json({ message: 'User created successfully',user:{
            _id: createdUser._id,
                fullname:createdUser.fullname,
                email:createdUser.email
        } } );

    } catch (error) {
        console.log("Error", error);
        
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                message: `This ${field} is already in use. Please choose a different one.`
            });
        }

        res.status(500).json({ message: "Server error during signup" });
    }
}

export const Login =async(req, res )=>{
    try {
        const {email, password}= req.body
        const user = await User.findOne({ email });

        if (!user) {
            console.log("user wrong")
            return res.status(401).json({ message: "Invalid email" });  
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });   
        }
        else{
            res.status(200).json({ message: "Login successful", user:{
                _id: user._id,
                fullname:user.fullname,
                email:user.email
            } });
        }
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Server error" }); 
    }
}