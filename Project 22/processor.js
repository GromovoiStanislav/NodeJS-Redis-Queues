module.exports = async function (job) {
  console.log(job.data);
  return Promise.resolve('OK');
};
