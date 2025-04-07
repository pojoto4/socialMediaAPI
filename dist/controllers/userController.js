import { User, Thought } from "../models/index.js";
/**
 * GET All Users /api/users
 * @returns an array of Users
 */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * GET User based on id /api/users/:userId
 * @param string userId
 * @returns a single User object with populated thought and friend data
 */
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
            .populate("thoughts")
            .populate("friends");
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(404).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * POST User /api/users
 * @param object user
 * @returns a single User object
 */
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * PUT User based on id /api/users/:userId
 * @param string userId
 * @param object user data
 * @returns updated User object
 */
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * DELETE User based on id /api/users/:userId
 * @param string userId
 * @returns success message
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        // BONUS: Remove user's associated thoughts
        await Thought.deleteMany({ username: user.username });
        return res.json({ message: "User and associated thoughts deleted!" });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * POST to add a friend /api/users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns updated User object
 */
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
/**
 * DELETE to remove a friend /api/users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns updated User object
 */
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
