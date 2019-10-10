const express = require('express');
const CommentRouter = express.Router();

const Comment = require('../../models/comment');
const FaveSong = require('../../models/faveSong');

//Add comment to a FaveSong
//_id = FaveSong _id
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

CommentRouter.delete('/:_id', getComment, async (req, res) => {
  try{
    await res.comment.remove();
    res.json({ message: 'Deleted comment'});
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
});

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

module.exports = CommentRouter;
