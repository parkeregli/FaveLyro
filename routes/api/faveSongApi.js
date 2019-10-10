const express = require('express');
const FaveSongRouter = express.Router();

const FaveSong = require('../../models/faveSong');

/**
* /api/faveSong - METHOD: GET
*
* @desc Gets the list of all faveSongs
* @param none
*/
FaveSongRouter.get('/', async (req, res) => {
  try{
    const faveSongs = await FaveSong.find().populate({path: 'comments', model: 'comment'});
    res.json(faveSongs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
* /api/faveSong/_id - METHOD: GET
*
* @desc Gets a single faveSong
* @param String _id - FaveSong id
*/
FaveSongRouter.get('/:_id', getFaveSong, (req, res) => {
  res.json(res.faveSong);
})

/**
* /api/faveSong - METHOD: POST
*
* @desc Creates a single FaveSong
* @param none
*/
FaveSongRouter.post('/', async (req, res) => {
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

/**
* /api/faveSong/_id - METHOD: DELETE
*
* @desc Deletes a single FaveSong
* @param String _id - FaveSong id
*/
FaveSongRouter.delete('/:_id', getFaveSong, async (req, res) => {
  try{
    await res.faveSong.remove();
    res.json({ message: 'Deleted FaveSong'});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

/**
* /api/faveSong/_id - METHOD: GET
*
* @desc Middleware function that retrieves a single faveSong from DB
* @param String _id - FaveSong id
*/
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

module.exports = FaveSongRouter;
