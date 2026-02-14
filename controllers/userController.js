const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const updateUserProfile = asyncHandler(async (req, res) => {
  console.log('Update Profile Req Body:', req.body);
  console.log('Update Profile Req File:', req.file);
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.location = req.body.location || user.location;
    user.bloodType = req.body.bloodType || user.bloodType;
    user.about = req.body.about || user.about;

    if (req.file) {
      user.image = req.file.path;
    }
    

    if (req.body.password) {
 
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bloodType: updatedUser.bloodType,
      age: updatedUser.age,
      gender: updatedUser.gender,
      location: updatedUser.location,
      donations: updatedUser.donations,
      image: updatedUser.image,
      about: updatedUser.about,
      token: req.headers.authorization.split(' ')[1], // Return same token
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
    updateUserProfile,
};
