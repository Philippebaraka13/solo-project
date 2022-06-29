const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();
const FormData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'test-api-key' });


//req.boy

// router.get('/', (req, res) => {
//   // GET route code here
//   const queryText = `SELECT books.*, invitation.email FROM "books" 
//     JOIN "invitation" ON "invitation".book_id = "books"."id" 
//     WHERE "invitation"."email" = $1;`
//   pool.query(queryText, [req.user.username])
//     .then(result => {
//       res.send(result.rows);
//     })
//     .catch(error => {
//       console.log('Error', error);
//       res.sendStatus(500)
//     })
// });
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT books.* , username FROM "books" 
  JOIN "invitation" on "invitation".book_id= "books".id
  JOIN "user" on "user".id= "books".user_id
  WHERE "books"."user_id"= $1 OR "invitation".email =$2;
  ;`
  pool.query(queryText, [req.user.id, req.user.username])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error', error);
      res.sendStatus(500)
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("line 30", req.body);

  const insertStory = `INSERT INTO "invitation" ("book_id", "email") VALUES ($1, $2);`
  pool.query(insertStory, [req.body.book_id, req.body.email])
    .then(result => {

      mg.messages.create('sandbox5260d368e46e424ea580450781456a2d.mailgun.org', {
        from: "BookStory<kamokamophilippe12@gmail.com>",
        to: [req.body.email],
        subject: "I invite you",
        text: "http://localhost:3000/#/books/25",
        html: "<h1>http://localhost:3000/#/books/25</h1>"
      })
        .then(msg => {
          res.sendStatus(201);
        }) // logs response data
        .catch(err => {
          console.error(err)
          res.sendStatus(500);
        }); // logs any error




    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});
router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "invitation" WHERE "book_id" =$1;`;
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(204);

    }).catch(error => {
      res.sendStatus(500);
    })
})






module.exports = router;