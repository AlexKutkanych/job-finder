const Job = require('../models/Job');
const { getSearchJobsParams } = require('../utils/searchJobs');

module.exports = {
  async searchJobs(req, res) {
    try {
      const params = getSearchJobsParams(req.body);
      console.log(req.cookies, '<<<<<<')

      const jobs = await Job.find(params);

      res.json(jobs);
    } catch (err) {
      res.status(400).json({ message: 'Error occurred' });
    }
  },

  async searchJobsById(req, res) {
    try {
      const id = req?.params?.id;
      if (!id) {
        res.status(404).json({ message: 'Please specify an id!' });
      }

      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ message: 'No job found with this id!' });
      }

      res.json(job);
    } catch (err) {
      res.status(400).json({ message: 'Error occurred' });
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
