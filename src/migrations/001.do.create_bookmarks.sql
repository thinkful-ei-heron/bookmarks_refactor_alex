CREATE TABLE bookmarks (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  rating INTEGER NOT NULL,
  CHECK(rating BETWEEN 1 AND 5)
)