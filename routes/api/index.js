/**
* /routes/api/index.js
*
* @description:: Index file for the api. All routes with "/api" come through here.
*
*
*/

const ApiRouter = require('express').Router();

//API Entry
//Maybe include help page here.
ApiRouter.get('/', (req, res) => {
  res.send('Hello World');
});

ApiRouter.use('/genius', require('./geniusApi'));
ApiRouter.use('/faveSongs', require('./faveSongApi'));
ApiRouter.use('/comment', require('./commentApi'));

module.exports = ApiRouter;
