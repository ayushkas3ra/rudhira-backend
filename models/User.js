const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    bloodType: {
      type: String,
      required: [true, 'Please add a blood type'],
    },
    age: {
      type: Number,
      required: [true, 'Please add an age'],
    },
    gender: {
        type: String,
        default: 'Not specified',
    },
    location: {
        type: String,
        default: 'Not specified',
    },
    donations: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
