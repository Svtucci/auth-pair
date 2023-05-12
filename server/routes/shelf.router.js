const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Use middleware code from class to reject users that are not logged in from viewing and addig
const {
  rejectUnauthenticated,
} = require ('../modules/authentication-middleware'); 


/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const addedItem = req.body;
  let queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                  VALUES ($1, $2, $3);`;
  pool.query(queryText, [addedItem.name, addedItem.image, req.user.id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(`Error in POST ${error}`);
    res.sendStatus(501);
  })
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
