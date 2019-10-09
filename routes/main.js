require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/search', (req, res) => {
  const query = req.query.q;
  const apiCall = 'http://localhost:3000/api/search/' + query;
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

router.get('/faves', (req, res) => {
  request('http://localhost:3000/api/faveSongs', (error, response, body) => {
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

router.post('/faves', (req, res) => {
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

module.exports = router;
