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
  })
})

module.exports = router;
