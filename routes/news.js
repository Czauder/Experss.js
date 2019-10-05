const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
  const findNews = News
  .find()
  .sort({created: -1 });

  findNews.exec((err, data) => {
    console.log(data);

    res.render('news', { title: 'News', data });
  });
});

module.exports = router;
