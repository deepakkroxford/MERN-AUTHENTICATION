import userModel from "../models/user.js"

const getUserData = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await userModel.findById(userId);
        console.log("hii i am called");
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        return res.status(200).json({success:true,userData:{
            name : user.name,
            isVerified:user.isVerified
        }});
    } 
    catch (error) {
        return res.status(500).json({ success: false, message: 'server error in getUserData' });
    }
}
export {
    getUserData
};