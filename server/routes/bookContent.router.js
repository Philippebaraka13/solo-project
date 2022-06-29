const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/', (req, res) => {
    // GET route code here
    const queryText = `SELECT * FROM "books" WHERE "user_id" = $1   ORDER BY "books"."id";
    `;
    pool.query(queryText, [req.user.id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(error => {
        console.log('Error', error);
        res.sendStatus(500)
      })
  });

  module.exports = router;