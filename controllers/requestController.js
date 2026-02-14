const asyncHandler = require('express-async-handler');
const Request = require('../models/Request');
const User = require('../models/User');


const getRequests = asyncHandler(async (req, res) => {

  
  let query = { status: 'pending' };
  
  if (req.user) {
      query.ignoredBy = { $ne: req.user._id };
  }

  const requests = await Request.find(query)
    .populate('requester', 'name location bloodType')
    .sort({ createdAt: -1 });

  res.status(200).json(requests);
});


const createRequest = asyncHandler(async (req, res) => {
  const { patientName, bloodType, units, location, requiredDate, urgency, note } = req.body;

  if (!patientName || !bloodType || !units || !location || !requiredDate || !urgency) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const request = await Request.create({
    requester: req.user.id,
    patientName,
    bloodType,
    units,
    location,
    requiredDate,
    urgency,
    note
  });

  res.status(201).json(request);
});


const updateRequestStatus = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }


  if (req.body.status === 'accepted') {
      if (request.status !== 'pending') {
          res.status(400);
          throw new Error('Request already processed');
      }
      if (request.requester.toString() === req.user.id) {
          res.status(400);
          throw new Error('Cannot accept your own request');
      }
      request.donor = req.user.id;
      request.status = 'accepted';
      

      await User.findByIdAndUpdate(req.user.id, { $inc: { donations: 1 } });
  } 

  else if (req.body.status === 'fulfilled' || req.body.status === 'cancelled') {
        if (request.requester.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }
        request.status = req.body.status;
  }

  const updatedRequest = await request.save();
  res.status(200).json(updatedRequest);
});


const getMyRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ requester: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
})

const ignoreRequest = asyncHandler(async (req, res) => {
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { ignoredBy: req.user.id } }, // req.user.id is string from Auth middleware usually, or use _id
        { new: true }
    );

    if (!request) {
        res.status(404);
        throw new Error('Request not found');
    }

    res.status(200).json({ message: 'Request ignored' });
});

module.exports = {
  getRequests,
  createRequest,
  updateRequestStatus,
  getMyRequests,
  ignoreRequest,
};
