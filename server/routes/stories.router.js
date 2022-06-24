const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "stories" ORDER BY "book_id", "id";`
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error', error);
      res.sendStatus(500)
    })
});


/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("line 30",req.body);

  const insertStory = `INSERT INTO "stories" ("user_id", "book_id", "content") VALUES ($1, $2, $3);`
  pool.query(insertStory, [req.user.id, req.body.id, req.body.content])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "stories"  WHERE "id" =$1;`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(204);

    }).catch(error => {
      res.sendStatus(500);
    })
})
router.put('/:id', (req, res) => {
  const queryText = `UPDATE stories SET "content" = $2 WHERE "id" =$1;`;
  pool.query(queryText, [req.params.id, req.body.content])
    .then(result => {
      console.log(req.params)
      res.sendStatus(204)
    }).catch(error => {
      res.sendStatus(500)
    })
})
module.exports = router;
