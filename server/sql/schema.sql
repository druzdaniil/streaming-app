PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS subscriptions (
   subscription_id INTEGER PRIMARY KEY AUTOINCREMENT,
   type TEXT NOT NULL UNIQUE,
   price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT,
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   password_hash TEXT NOT NULL,
   created_at DATETIME NOT NULL DEFAULT (datetime ('now')),
   subscription_id INTEGER REFERENCES subscriptions (subscription_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS transactions (
   transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
   user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
   subscription_id INTEGER NOT NULL REFERENCES subscriptions (subscription_id),
   started_at DATETIME NOT NULL DEFAULT (datetime ('now')),
   expires_at DATETIME NOT NULL,
   status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired'))
);

CREATE TABLE IF NOT EXISTS content (
   content_id INTEGER PRIMARY KEY AUTOINCREMENT,
   content_type TEXT NOT NULL CHECK (content_type IN ('film', 'series')),
   title TEXT NOT NULL,
   release_year INTEGER NOT NULL,
   description TEXT,
   rating REAL DEFAULT 0 CHECK (rating BETWEEN 0 AND 10),
   poster_url TEXT
);

CREATE TABLE IF NOT EXISTS films (
   film_id INTEGER PRIMARY KEY REFERENCES content (content_id) ON DELETE CASCADE,
   duration INTEGER,
   video_url TEXT
);

CREATE TABLE IF NOT EXISTS series (
   series_id INTEGER PRIMARY KEY REFERENCES content (content_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS seasons (
   season_id INTEGER PRIMARY KEY AUTOINCREMENT,
   series_id INTEGER NOT NULL REFERENCES series (series_id) ON DELETE CASCADE,
   season_number INTEGER NOT NULL,
   title TEXT,
   UNIQUE (series_id, season_number)
);

CREATE TABLE IF NOT EXISTS episodes (
   episode_id INTEGER PRIMARY KEY AUTOINCREMENT,
   season_id INTEGER NOT NULL REFERENCES seasons (season_id) ON DELETE CASCADE,
   episode_number INTEGER NOT NULL,
   title TEXT NOT NULL,
   duration INTEGER,
   video_url TEXT,
   UNIQUE (season_id, episode_number)
);

CREATE TABLE IF NOT EXISTS genres (
   genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS actors (
   actor_id INTEGER PRIMARY KEY AUTOINCREMENT,
   full_name TEXT NOT NULL,
   biography TEXT
);

CREATE TABLE IF NOT EXISTS directors (
   director_id INTEGER PRIMARY KEY AUTOINCREMENT,
   full_name TEXT NOT NULL,
   biography TEXT
);

CREATE TABLE IF NOT EXISTS content_genres (
   content_genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
   content_id INTEGER NOT NULL REFERENCES content (content_id) ON DELETE CASCADE,
   genre_id INTEGER NOT NULL REFERENCES genres (genre_id) ON DELETE CASCADE,
   UNIQUE (content_id, genre_id)
);

CREATE TABLE IF NOT EXISTS content_actors (
   content_actor_id INTEGER PRIMARY KEY AUTOINCREMENT,
   content_id INTEGER NOT NULL REFERENCES content (content_id) ON DELETE CASCADE,
   actor_id INTEGER NOT NULL REFERENCES actors (actor_id) ON DELETE CASCADE,
   UNIQUE (content_id, actor_id)
);

CREATE TABLE IF NOT EXISTS content_directors (
   content_director_id INTEGER PRIMARY KEY AUTOINCREMENT,
   content_id INTEGER NOT NULL REFERENCES content (content_id) ON DELETE CASCADE,
   director_id INTEGER NOT NULL REFERENCES directors (director_id) ON DELETE CASCADE,
   UNIQUE (content_id, director_id)
);

CREATE TABLE IF NOT EXISTS reviews (
   review_id INTEGER PRIMARY KEY AUTOINCREMENT,
   user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
   content_id INTEGER NOT NULL REFERENCES content (content_id) ON DELETE CASCADE,
   text TEXT NOT NULL,
   rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 10),
   created_at DATETIME NOT NULL DEFAULT (datetime ('now')),
   UNIQUE (user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_content_rating ON content (rating DESC);

CREATE INDEX IF NOT EXISTS idx_content_type ON content (content_type);
