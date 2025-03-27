const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne(); 
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profileData = req.body;

  
    if (!profileData.name || !profileData.email || !profileData.phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }



    const profile = await Profile.findOneAndUpdate(
      {}, 
      profileData,
      {
        upsert: true, 
        new: true,
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};