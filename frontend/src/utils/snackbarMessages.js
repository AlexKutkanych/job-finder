export const getSaveJobMessage = (savedJobs = [], jobId) =>
  savedJobs?.find(({ _id }) => _id === jobId)
    ? 'Job saved to bookmarks!'
    : 'Job removed from bookmarks!';
