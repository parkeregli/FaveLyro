require('dotenv').config();

const express = require('express');
const GeniusRouter = express.Router();

//Genius API Interface using genius-api
//https://github.com/jahrlin/genius-api
const geniusApi = require('genius-api');
const genius = new geniusApi(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

//Search the Genius api
//Arguments: Query - String
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

//Get Song from Genius api
//Arguments: SongId - Number
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

//Get Artist from Genius api
//Arguments: ArtistId - Number
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
