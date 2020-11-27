const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).render('add');
  } catch (error) {
    res.status(400).send(error);
  }
  next();
});

module.exports = router;