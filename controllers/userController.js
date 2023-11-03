const userService = require('./userService');

const userController = {
  changeUserRole: async (req, res) => {
    console.log("Req body ", req.body);
    const { userId, isAdmin } = req.body;
    console.log("Server check");
    try {
      await userService.changeUserRole(userId, isAdmin);
      res.json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.json({ success: false, error: 'An error occurred while changing the user role.' });
    }
  }
};

module.exports = userController;

