const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    patientName: {
      type: String,
      required: [true, 'Please add patient name'],
    },
    bloodType: {
      type: String,
      required: [true, 'Please add blood type'],
    },
    units: {
      type: Number,
      required: [true, 'Please add units required'],
    },
    location: {
        type: String,
        required: [true, 'Please add location'],
    },
    requiredDate: {
        type: Date,
        required: [true, 'Please add required date'],
    },
    urgency: {
        type: String,
        enum: ['Critical (Within 2 hrs)', 'Urgent (Within 6 hrs)', 'Standard (Within 24 hrs)'],
        required: [true, 'Please select urgency'],
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'fulfilled', 'cancelled'],
        default: 'pending',
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ignoredBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Request', requestSchema);
