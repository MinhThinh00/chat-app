import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});
        try{
            await newUser.save();
            res.status(201).json({
               message: "User created successfully",
               success: true
            });
        } catch(err){
            next(err)
        }
      
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const login =  async(req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        const validPassword= bcrypt.compareSync(password,user.password)
        if(!user){
            return res.status(400).json({ error: "User not found" });
        }
        if(!validPassword){
            return res.status(400).json({ error: "Invalid Password" });
        }
        const token= jwt.sign({id: user._id }, process.env.JWT_SECRET)
        const {password: pass, ...userInfor}= user._doc
        res.cookie("access_token",token, {httpOnly: true}).status(200).json({...userInfor,token}) 
    } catch (error) {
        next(error)
    }
}; 
export const logout = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
      } catch (error) {
        next(error);
      }
};