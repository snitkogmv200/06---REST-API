import { db } from "../database.js";

export const itemModel = {
  getAllItems: function () {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getItemById: function (id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM items WHERE id=?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  createItem: function (item) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO items(name, description) VALUES(?, ?)",
        [item.name, item.description],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  },

  updateItem: function (id, item) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE items SET name=?, description=? WHERE id=?",
        [item.name, item.description, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        }
      );
    });
  },

  deleteItem: function (id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM items WHERE id=?", [id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.changes);
        }
      });
    });
  },
};
