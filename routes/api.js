require('dotenv').config();

const express = require('express');
const router = express.Router();

const FaveSong = require('../models/faveSong');

//Genius API Interface using genius-api
//https://github.com/jahrlin/genius-api
const geniusApi = require('genius-api');
const genius = new geniusApi(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

module.exports = router;

//API Entry
//Maybe include help page here.
router.get('/', (req, res) => {
  res.send('Hello World');
});

//Search the Genius api
//Arguments: Query - String
router.get('/search/:q', (req, res) => {
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
router.get('/song/:_id', (req, res) => {
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
router.get('/artist/:_id', (req, res) => {
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

//Get faveSongs
router.get('/faveSongs', async (req, res) => {
  try{
    const faveSongs = await FaveSong.find();
    res.json(faveSongs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one faveSongs
router.get('/faveSongs/:_id', getFaveSong, (req, res) => {
  res.json(res.faveSong);
})

//Creating one faveSong

router.post('/faveSongs', async (req, res) => {
  console.log(req.body);
  const faveSong = new FaveSong({
      api_id: req.body.api_id,
      full_title: req.body.full_title,
      lyric_url: req.body.lyric_url
  });
  try{
    const newFaveSong = await faveSong.save();
    res.status(201).json(newFaveSong);
  } catch (err){
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//Delete a FaveSong
router.delete('/faveSongs/:_id', getFaveSong, async (req, res) => {
  try{
    await res.faveSong.remove();
    res.json({ message: 'Deleted FaveSong'});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

//Update a faveSong
//Only can really update comments currently
router.patch('/faveSongs/:_id', getFaveSong, async (req, res) => {
  try{

  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

//Middleware function to retrieve a single FaveSong
async function getFaveSong(req, res, next) {
  try{
    faveSong = await FaveSong.findById(req.params._id);
    if(faveSong == null){
      return res.status(404).json( { message: 'Cannot find FaveSong'})
    }
  }catch (err){
    return res.status(500).json( { message: err.message });
  }

  res.faveSong = faveSong;
  next();
}
