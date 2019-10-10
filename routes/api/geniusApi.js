require('dotenv').config();

const express = require('express');
const GeniusRouter = express.Router();

//Genius API Interface using genius-api
//https://github.com/jahrlin/genius-api
const geniusApi = require('genius-api');
//You will either need to register an account on the genius api or use an existing token
const genius = new geniusApi(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

/**
* /api/genius/search/q - METHOD: GET
*
* @desc Gets a search result from the Genius API
* @param String q - Search query
*/
GeniusRouter.get('/search/:q', (req, res) => {
  try{
    genius.search(req.params.q).then(function(response){
      const payload = ('hits', response.hits);
      res.status(200).json( { results: payload });
    }).catch(function(error){
      res.status(503).json( { message: error });
      console.error('Genius API not available');
    });
  } catch (err) {
    res.status(500).json( { message: err.message });
  }
});

/**
* /api/genius/song/_id - METHOD: GET
*
* @desc Gets a specific song from the Genius API
* @param String _id - Genius API song id
*/
GeniusRouter.get('/song/:_id', (req, res) => {
  try{
    genius.song(req.params._id).then(function(response){
      const payload = ('song', response.song);
      res.status(200).json( { results: payload });
    }).catch(function(error){
      res.status(503).json( { message: error });
      console.error('Genius API not available');
    });
  } catch (err) {
    res.status(500).json( { message: err.message });
  }
});

/**
* /api/genius/artist/_id - METHOD: GET
*
* @desc Gets a specific artist from the Genius API
* @param String _id - Genius API artist id
*/
GeniusRouter.get('/artist/:_id', (req, res) => {
  try{
    genius.artist(req.params._id).then(function(response){
      const payload = ('artist', response.artist);
      res.status(200).json( { results: payload });
    }).catch(function(error){
      res.status(503).json( { message: error });
      console.error('Genius API not available');
    });
  } catch (err){
    res.status(500).json( { message: err.message });
  }
});

module.exports = GeniusRouter;
