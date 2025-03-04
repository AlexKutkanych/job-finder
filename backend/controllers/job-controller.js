const Job = require('../models/Job');
const User = require('../models/User');
const { getSearchJobsParams } = require('../utils/searchJobs');

module.exports = {
  async searchJobs(req, res) {
    try {
      const params = getSearchJobsParams(req.body);
      const jobs = await Job.find(params);

      res.status(200).json(jobs);
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

      res.status(201).json(jobs);
    } catch (err) {
      res.status(400).json(err, 'Error occurred');
    }
  },

  async applyForJob(req, res) {
    try {
      const userId = req?.body?.userId;
      const jobId = req?.body?.jobId;

      const job = await Job.findById(jobId);
      const user = await User.findById(userId);

      if (!user || !job) {
        return res.status(404).json({ error: 'User or Job not found' });
      }

      user.jobsApplied.push(jobId);
      job.applicants.push(userId);

      await user.save();
      await job.save();

      res
        .status(200)
        .json({ status: 'ok', message: 'Job application successful', user });
    } catch (err) {
      const errors = handleError(err);
      return res.status(400).json({ errors });
    }
  },

  async bookmarkJob(req, res) {
    try {
      const jobId = req?.body?.jobId;
      const userId = req?.body?.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found!' });
      }

      if (user.savedJobs.includes(jobId)) {
        user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
      } else {
        user.savedJobs.push(jobId);
      }

      await user.save();

      const savedJobs = await Job.find({
        _id: { $in: user?.savedJobs },
      }).select('location _id title company');

      const jobsApplied = await Job.find({
        _id: { $in: user?.jobsApplied },
      }).select('location _id title company');

      return res
        .status(200)
        .json({
          status: 'ok',
          message: 'Job bookmarked',
          user: { ...user?._doc, savedJobs, jobsApplied },
        });
    } catch (err) {
      const errors = handleError(err);
      return res.status(400).json({ errors });
    }
  },
};
