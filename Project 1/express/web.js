import Queue from 'bee-queue';
import logger from 'morgan';
import express from 'express';

const app = express();
app.use(logger('dev'));

const queue = new Queue('express-example');

app.get('/run/:x/:y', (req, res) => {
  const job = queue.createJob({
    x: parseInt(req.params.x),
    y: parseInt(req.params.y),
  });

  job.on('succeeded', (result) => {
    console.log('completed job ' + job.id);
    res.send('output: ' + result);
  });

  job.save((err) => {
    if (err) {
      console.log('job failed to save');
      return res.send('job failed to save');
    }
    console.log('saved job ' + job.id);
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
