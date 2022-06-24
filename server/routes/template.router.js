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

  const queryText = `SELECT * FROM "books" WHERE "user_id" = "id";`
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
  console.log(req.body);

  const insertBookquery = `INSERT INTO "books" ("title", "description", "date") VALUES ($1, $2, $3) RETURNING "id";`
  pool.query(insertBookquery, [req.body.title, req.body.description, req.body.date])
    .then(result => {
      const createBookId = result.rows[0].id
      console.log('new book Id:',createBookId);

      const insertInvitation = `INSERT INTO "stories" ("user_id", "book_id") VALUES ($1, $2);`
      pool.query(insertInvitation, [req.user.id, createBookId])
        .then(result => {
          res.sendStatus(201);
        }).catch(err => {
          console.log(err);
          res.sendStatus(500)
        })
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "books" WHERE "id" =$1;`;
  pool.query(queryText)
    .then(result => {
      res.sendStatus(204);

    }).catch(error => {
      res.sendStatus(500);
    })
})
router.put('/:id', (req, res) => {
  const queryText = `UPDATE books SET "complete" = Not "complete" WHERE "id" =$1;`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      console.log(req.params)
      res.sendStatus(204)
    }).catch(error => {
      res.sendStatus(500)
    })
})
module.exports = router;
