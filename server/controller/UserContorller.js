import User from '../model/userSchema.js';

const setUser = async (req, res) => {
    const { userType } = req.body;
  

    if (!req.userId) {
        return res.status(403).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update the user type
        user.userType = userType; // Update the userType field

        // Optional: If you want to set status based on user type
        if (userType === "Student" || userType === "Teacher") {
            user.status = "Partial"; // Set status to Partial when user type is set
        }

        await user.save();

        res.status(200).json({ message: 'User type updated successfully.', user });
    } catch (error) {
        console.error('Error updating user type:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

export default setUser;
