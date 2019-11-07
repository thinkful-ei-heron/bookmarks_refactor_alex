const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');
const { bookmarks }  = require('../store');
const BookmarksService = require('./BookmarksService')

const bookmarksRouter = express.Router();
const bodyParser = express.json();


/* Bookmark routes */
bookmarksRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks)
      })
      .catch(next)
});

bookmarksRouter
  .route('/')
  .post(bodyParser, (req, res) => {
    const {title, url, description='', rating} = req.body;
    
    //If title don't exist
    if(!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Invalid data');
    }
    //If url don't exist
    if(!url) {
      logger.error('URL is required');
      return res
        .status(400)
        .send('Invalid data');
    }
    //If rating don't exist
    if(!rating) {
      logger.error('Rating is required');
      return res
        .status(400)
        .send('Invalid data');
    }
    //If they exist
    const id = uuid();
    
    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    }

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  })  

bookmarksRouter
  .route('/:bookmarkId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    BookmarksService.getById(knexInstance, req.params.bookmarkId)
      .then(bookmark => {
        if(!bookmark) {
          logger.error(`Bookmark with id ${req.params.bookmarkId} not found.`);
          return res
            .status(404)
            .json({ error: { message: 'Bookmark Not Found' } });
        }
        res.json(bookmark)
      })
      .catch(next)
  })

  .delete((req, res) => {
    const { bookmarkId } = req.params;
    const bookmarkIndex = bookmarks.findIndex(bMark => bMark.id == bookmarkId);

    //checks if bookmark exists
    if(bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${bookmarkId} not found.`);
      return res
        .status(404)
        .send('Not found');
    }

    //removes bookmark from bookmarks
    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${bookmarkId} deleted.`);

    res
      .status(204)
      .end();
  });

module.exports = bookmarksRouter;