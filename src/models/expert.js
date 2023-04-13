const mongoose = require('mongoose');

const expertsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    totalRating: Number,

    totalReviews: Number,
  },
  location: {
    city: String,
    state: String,
  },
  experience: {
    type: Number,
  },
  specialization: {
    type: String,
    required: true,
  },
  university: {
    type: String,
  },
  fee: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
  profilepic: {
    type: String,
    default:
      'https://res.cloudinary.com/debvb6ifr/image/upload/v1680182714/TaskManagementProfilePics/profilepic_akjf1e.jpg',
  },
  bio: {
    type: String,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  peopleContacting: [
    {
      name: String,
      mobileNo: String,
      emailId: String,
      message: String,
      _id: false,
    },
  ],
});
mongoose.model('Expert', expertsSchema);
