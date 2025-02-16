module.exports = {
  getSearchJobsParams: function (body) {
    const { jobCity, jobCountry, jobField, jobSearch, visa } = body;

    let params = {};
    let keyWords = {};

    if (jobCountry !== 'all') {
      params['location.code'] = jobCountry;
    }

    if (jobCity !== 'all') {
      params['location.city'] = jobCity;
    }

    if (jobField !== 'all') {
      params.jobField = jobField;
    }

    if (visa && !['all', 'unknown'].includes(visa)) {
      params['visa.id'] = visa;
    }

    if (jobSearch) {
      keyWords = { keyWords: { $regex: jobSearch, $options: 'i' } };
    }

    return { ...params, ...keyWords };
  },
};
