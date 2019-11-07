const BookmarksService = {
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmarks');
  },

  getById(knex, id) {
    return knex
      .select('*')
      .from('bookmarks')
      .where('id', id)
      .first();
  },

  insertBookmarks(knex, art) {
    return knex
      .insert(art)
      .into('bookmarks')
      .returning('*')
      .then(rows => rows[0])
    },

  deleteBookmark(knex, id) {
    return knex('bookmarks')
      .delete()
      .where({ id })
  },

  updateBookmark(knex, id, newData) {
    return knex('bookmarks')
      .update(newData)
      .where({ id })
  }
};

module.exports = BookmarksService;