const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeBookmarksArray } = require('./bookmarks.fixtures')

describe('Bookmarks Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('bookmarks').truncate())

  afterEach('cleanup', () => db('bookmarks').truncate())

  describe('GET /bookmarks', () => {
    context('Given no articles', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/bookmarks')
          .set({ 'Authorization': 'Bearer secret-api-key'})
          .expect(200, [])
      })
    })
    context('Given there are articles in the database', () => {
      const testBookmarks = makeBookmarksArray()

      beforeEach('insert articles', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })

      it('Responds with 200 and all of the articles', () => {
        return supertest(app)
          .get('/bookmarks')
          .set({ 'Authorization': 'Bearer secret-api-key'})
          .expect(200, testBookmarks)
      })
    })
  })
  describe('GET /bookmarks/:bookmark_id', () => {
    context('Given no bookmarks', () => {
      it('responds with 404', () =>{
        const bookmarkId = 12345
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .set({ 'Authorization': 'Bearer secret-api-key'})
          .expect(404, { error: { message: 'Bookmark Not Found' } })
      })
    })
  })

})