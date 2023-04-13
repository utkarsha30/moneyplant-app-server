const mongoose = require('mongoose');
const Expert = mongoose.model('Expert');
const registerNewExpert = (details) => {
  return Expert.create(details);
};
const showAllExperts = () => {
  return Expert.find();
};
const filterExperts = (location, specialization) => {
  return Expert.find({
    $and: [
      {
        'location.city': location.city,
        'loaction.state': location.state,
      },
      {
        specialization: {
          $regex: `.*${specialization}.*`,
        },
      },
    ],
  });
};
const filterExperBySpecialization = (specialization) => {
  return Expert.find({
    specialization,
  });
};
const filterExpertByLocation = (location) => {
  return Expert.find({
    'location.city': location.city,
    'loaction.state': location.state,
  });
};
const patchExpertData = (id, data) => {
  return Expert.findByIdAndUpdate(
    id,
    {
      $push: {
        peopleContacting: {
          name: data.peopleContacting.name,
          mobileNo: data.peopleContacting.mobileNo,
          emailId: data.peopleContacting.emailId,
          message: data.peopleContacting.message,
        },
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
};
const getAllLocations = () => {
  return Expert.distinct('location');
};
const getAllSpecializations = () => {
  return Expert.distinct('specialization');
};

module.exports = {
  registerNewExpert,
  showAllExperts,
  filterExperts,
  filterExperBySpecialization,
  filterExpertByLocation,
  patchExpertData,
  getAllLocations,
  getAllSpecializations,
};
