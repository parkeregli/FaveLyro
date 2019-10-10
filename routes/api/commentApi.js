const express = require('express');
const CommentRouter = express.Router();

const Comment = require('../../models/comment');
const FaveSong = require('../../models/faveSong');

/**
* /api/comment/id - METHOD: POST
*
* @desc Creates a comment on a favorite FaveSong
* @param string _id - FaveSong id
*/
CommentRouter.post('/:_id', getFaveSong, async (req, res) => {
  if(req.body.commentText != null){
    const comment = new Comment({
      text: req.body.commentText,
    });

    try{
      await comment.save();
      await res.faveSong.comments.push(comment);
      await res.faveSong.save();
      res.json({ message: 'Comment added successfully'});
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  }else{
    res.status(404).json({ message: "No comment text"});
  }
});

/**
* /api/comment/id - METHOD: DELETE
*
* @desc Deletes a comment on a favorite FaveSong
* @param string _id - Comment id
*/
CommentRouter.delete('/:_id', getComment, async (req, res) => {
  try{
    await res.comment.remove();
    res.json({ message: 'Deleted comment'});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

/**
*
* @desc Middleware function that gets a single comment based on ID
* @param string _id - Comment id
*/
async function getComment(req, res, next) {
  try{
    comment = await Comment.findById(req.params._id);
    if(comment == null){
        return res.status(404).json( { message: 'Cannot find comment'})
    }
  } catch(err){
    return res.status(500).json( { message: err.message });
  }

  res.comment = comment;
  next();
}

/**
*
* @desc Middle ware function that gets a single FaveSong based on ID
* @param string _id - FaveSong id 
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

module.exports = CommentRouter;
