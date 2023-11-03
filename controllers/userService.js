// Assuming you have a User model defined in your application
const User = require('./../models/userModel'); 

const userService = {
  changeUserRole: async (userId, isAdmin) => {
    try {
      // Use Mongoose to update the user's role
      console.log(userId, isAdmin);
      const res = await User.findByIdAndUpdate(userId, { admin: isAdmin });
      console.log(res);
    } catch (error) {
      throw new Error('Error while changing user role');
    }
  }
};

module.exports = userService;
