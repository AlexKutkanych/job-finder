const Job = require('../models/Job');
const { getSearchJobsParams } = require('../utils/searchJobs');

module.exports = {
  async searchJobs(req, res) {
    try {
      const params = getSearchJobsParams(req.body);

      console.log(req.body, '!!!!!');
      const jobs = await Job.find(params);

      res.json(jobs);
    } catch (err) {
      res.status(400).send('Error occurred');
    }
  },

  async createJob(req, res) {
    try {
      const jobs = await Job.create(req.body);

      res.json(jobs);
    } catch (err) {
      res.status(400).send(err, 'Error occurred');
    }
  },
};
