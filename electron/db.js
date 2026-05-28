import Database from "better-sqlite3-multiple-ciphers";

import path from "path";

import { app } from "electron";

import { getDatabaseKey } from "./security/keyManager.js";

// ----------------------------------
// DATABASE PATH
// ----------------------------------

const dbPath = path.join(app.getPath("userData"), "sbilliz.db");

// ----------------------------------
// DATABASE INSTANCE
// ----------------------------------

const db = new Database(dbPath);

// ----------------------------------
// ENCRYPTION KEY
// ----------------------------------

const encryptionKey = getDatabaseKey();

// Apply encryption
db.pragma(`key = '${encryptionKey}'`);

db.pragma("cipher = 'sqlcipher'");

// ----------------------------------
// SQLITE OPTIMIZATIONS
// ----------------------------------

db.pragma("journal_mode = WAL");

db.pragma("foreign_keys = ON");

db.pragma("synchronous = NORMAL");

db.pragma("temp_store = MEMORY");

// ----------------------------------
// CREATE TABLES
// ----------------------------------

db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT NOT NULL
)
`,
).run();

// ----------------------------------
// EXPORT DATABASE
// ----------------------------------

export default db;
