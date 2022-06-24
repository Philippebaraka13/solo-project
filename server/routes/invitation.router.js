const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  const router = express.Router();
  const FormData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'test-api-key' });




router.get('/', (req, res) => {
    // GET route code here
    const queryText = `SELECT * FROM "invitation" ORDER BY "book_id";`
    pool.query(queryText)
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
    console.log("line 30",req.body);
  
    const insertStory = `INSERT INTO "invitation" ("book_id", "username") VALUES ($1, $2);`
    pool.query(insertStory, [req.body.book_id, req.body.username])
      .then(result => {

        mg.messages.create('sandbox5260d368e46e424ea580450781456a2d.mailgun.org', {
            from: "BookStory<kamokamophilippe12@gmail.com>",
            to: [req.body.username],
            subject: "Hello",
            text: "Testing some Mailgun awesomness!",
            html: "<h1>Testing some Mailgun awesomness!</h1>"
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






  module.exports = router;