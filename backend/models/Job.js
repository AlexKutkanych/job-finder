const { Schema, model } = require('mongoose');

const jobLocationSchema = new Schema({
  country: { type: String, required: true },
  city: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  employees: {
    type: String,
    required: true,
  },
});

const visaSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
});

const jobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: companySchema, required: true },
  location: { type: jobLocationSchema, required: true },
  type: { type: String, required: true },
  salary: { type: String, required: true },
  keyWords: { type: [String], required: true },
  visa: { type: visaSchema, required: true },
  experienceLevel: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  responsibilities: { type: [String], required: true },
  postedDate: { type: Date, required: true },
  applicationDeadline: { type: Date, required: true },
  jobField: { type: String, required: true }
});

const Job = model('Job', jobSchema);

module.exports = Job;
