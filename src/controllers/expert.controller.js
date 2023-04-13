const expertService = require('../services/expert.service');
const newExpert = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(404).json({
      status: 'error',
      message: `Request body is missing, and needs to register new expert`,
    });
  }
  try {
    const newExpert = await expertService.registerNewExpert(req.body);
    res.status(201).json(newExpert);
  } catch (error) {
    res.json(error.message);
  }
};
const allExperts = async (req, res) => {
  try {
    const allExperts = await expertService.showAllExperts();
    res.status(200).json(allExperts);
  } catch (error) {
    res.json(error.message);
  }
};
const getAllLocations = async (req, res) => {
  try {
    const allLocations = await expertService.getAllLocations();
    res.status(200).json(allLocations);
  } catch (error) {
    res.json(error.message);
  }
};
const getAllSpecializations = async (req, res) => {
  try {
    const allSpecializations =
      await expertService.getAllSpecializations();
    res.status(200).json(allSpecializations);
  } catch (error) {
    res.json(error.message);
  }
};
const filterExperts = async (req, res, next) => {
  try {
    if (req.query.action !== 'filter') {
      return next('route');
    }
    console.log(
      req.query.city,
      req.query.state,
      req.query.specialization
    );
    var location = {};
    let filter = '';
    if (!req.query.city || !req.query.state) {
      filter = await expertService.filterExperBySpecialization(
        req.query.specialization
      );
    } else if (!req.query.specialization) {
      location = {
        city: req.query.city,
        state: req.query.state,
      };
      filter = await expertService.filterExpertByLocation(location);
    } else {
      location = {
        city: req.query.city,
        state: req.query.state,
      };
      filter = await expertService.filterExperts(
        location,
        req.query.specialization
      );
    }

    res.status(200).json(filter);
  } catch (error) {
    res.json(error.message);
  }
};
const connectToExpert = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(404).json({
      status: 'error',
      message: `Request body is missing, and needs customer information to rise request`,
    });
  }
  try {
    const connectNow = await expertService.patchExpertData(
      id,
      req.body
    );
    res.status(200).json(connectNow);
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  newExpert,
  allExperts,
  filterExperts,
  connectToExpert,
  getAllLocations,
  getAllSpecializations,
};
