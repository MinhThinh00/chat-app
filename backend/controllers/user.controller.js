import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.userId; // Lấy userId của người đăng nhập từ req
        //console.log(loggedInUserId);
        // Truy xuất tất cả người dùng trừ người đăng nhập
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
