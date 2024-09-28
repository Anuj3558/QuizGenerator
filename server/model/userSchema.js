import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
    default: 'default-profile-pic.jpg',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  location: String,
});



const User = mongoose.model('User', userSchema);

export default User;