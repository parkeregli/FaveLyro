require('dotenv').config();

const express = require('express');
const MainRouter = express.Router();
const request = require('request');

MainRouter.get('/', (req, res) => {
  res.render('home');
});

MainRouter.get('/search', (req, res) => {
  const query = req.query.q;
  const apiCall = 'http://localhost:3000/api/genius/search/' + query;
  request(apiCall, (error, response, body) => {
    if(error){
      res.send(error);
    }else{
      const info = JSON.parse(body);
      res.render('searchResults', {
        content: info
      });
    }
  });
});

MainRouter.get('/faves', (req, res) => {
  request('http://localhost:3000/api/faveSongs/', (error, response, body) => {
    if(error){
      res.send(error);
    }else{
      const info = JSON.parse(body);
      res.render('faveSongs', {
        content: info
      });
    }
  });
});

MainRouter.post('/faves', (req, res) => {
  const options = {
    url: 'http://localhost:3000/api/faveSongs',
    method: 'POST',
    json: true,
    body: {
      api_id: req.body.api_id,
      full_title: req.body.full_title,
      lyric_url: req.body.lyric_url
    }
  }

  request.post(options, (error, response, body) => {
    if(error){
      return console.error('upload failed:', error);
    }else{
      console.log('Upload successful! Server responded with:', body);
      res.redirect('/faves');
    }
  });
});

MainRouter.post('/faves/delete', (req, res) => {
  const faveSongId = req.body.id;
  const uri = 'http://localhost:3000/api/faveSongs/' + faveSongId;
  request.delete(uri, (error, response, body) => {
    if(error){
      return console.error('delete failed:', error);
    }else{
      console.log('Delete successful! Server responded with:', body);
      res.redirect('/faves');
    }
  });
});

MainRouter.post('/faves/addComment', (req, res) => {
  const faveSongId = req.body.id;
  const options = {
    url: 'http://localhost:3000/api/comment/' + faveSongId,
    method: 'POST',
    json: true,
    body: {
      commentText: req.body.comment
    }
  }

  request.post(options, (error, response, body) => {
    if(error){
      return console.error('upload failed:', error);
    }else{
      console.log('Upload successful! Server responded with:', body);
      res.redirect('/faves');
    }
  });

});

MainRouter.post('/faves/deleteComment', (req, res) => {
  const commentId = req.body.id;
  const uri = 'http://localhost:3000/api/comment/' + commentId;
  request.delete(uri, (error, response, body) => {
    if(error){
      return console.error('delete failed:', error);
    }else{
      console.log('Delete successful! Server responded with:', body);
      res.redirect('/faves');
    }
  });
})



module.exports = MainRouter;
