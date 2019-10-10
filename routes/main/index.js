const express = require('express');
const MainRouter = express.Router();
const request = require('request');

/**
* / - METHOD: GET
*
* @desc Serves the home page for the client
*
*/
MainRouter.get('/', (req, res) => {
  res.render('home');
});

/**
* / - METHOD: GET
*
* @desc Serves the search page for the client
*
* view: home.handlebars
*
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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

/**
* / - METHOD: GET
*
* @desc Serves the Faves page for the client that shows the list of FaveSongs
*
* view: faveSongs.handlebars
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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

/**
* / - METHOD: POST
*
* @desc Client route to post a FaveSong to DB using the API
*
*
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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

/**
* / - METHOD: POST
*
* @desc Client route to delete a FaveSong on DB using the API
*
*
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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

/**
* / - METHOD: POST
*
* @desc Client route to post a comment onto a FaveSong to DB using the API
*
*
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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

/**
* / - METHOD: POST
*
* @desc Client route to delete a comment on DB using the API
*
*
* Concerns:
* Not sure if it is best practice to hard code the api URI.
*/
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
