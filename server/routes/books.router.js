const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here

  const queryText = `SELECT * FROM "books" WHERE "user_id" =$1;`

  pool.query(queryText, [req.user.id])
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

  const insertBookquery = `INSERT INTO "books" ("title", "description", "date", "user_id") VALUES ($1, $2, $3, $4) RETURNING "id";`
  pool.query(insertBookquery, [req.body.title, req.body.description, req.body.date, req.user.id])
    .then(result => {
      const createBookId = result.rows[0].id
      console.log('new book Id:', createBookId);
      res.sendStatus(201);

      // const insertInvitation = `INSERT INTO "stories" ("user_id", "book_id") VALUES ($1, $2);`
      // pool.query(insertInvitation, [req.user.id, createBookId])
      //   .then(result => {
      //     res.sendStatus(201);
      //   }).catch(err => {
      //     console.log(err);
      //     res.sendStatus(500)
      //   })
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

router.delete('/:id', (req, res) => {
  const queryText = `
 
  DELETE FROM "books" WHERE "books"."id"=$1;`;
  console.log("delete2", req.params.id);
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(204);

    }).catch(error => {
      console.log("err",error);
      res.sendStatus(500);
    })
})
router.put('/:id', (req, res) => {
  const queryText = `UPDATE books SET "complete" = Not "complete" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      console.log(req.params)
      res.sendStatus(204)
    }).catch(error => {
      res.sendStatus(500)
    })
})
module.exports = router;
