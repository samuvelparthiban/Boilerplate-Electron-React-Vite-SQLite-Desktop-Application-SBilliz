import db from '../db.js';

function registerUserIPC(ipcMain) {
  // Add user
  ipcMain.handle("user:add", (event, name) => {
    const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
    const result = stmt.run(name);
    return { id: result.lastInsertRowid };
  });

  // Get users
  ipcMain.handle("user:getAll", () => {
    const stmt = db.prepare("SELECT * FROM users ORDER BY id DESC");
    return stmt.all();
  });

  // Delete user
  ipcMain.handle("user:delete", (event, id) => {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    return stmt.run(id);
  });
}

export default registerUserIPC;