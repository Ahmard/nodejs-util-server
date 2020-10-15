const sql = require("../database/connector.js");

// constructor
const Note = function(note) {
    this.title = note.title;
    this.note = note.note;
    this.category_id = note.category_id;
    this.created_at = (new Date()).getTime();
    this.updated_at = (new Date()).getTime();
};

Note.create = function (newNote, callback) {
    sql.query(
        "INSERT INTO notes (title, note, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
        [newNote.title, newNote.note, `${newNote.category_id}`, `${newNote.created_at}`, `${newNote.updated_at}`],
        function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        console.log("created note: ", { id: result.insertId, ...newNote });
        callback(null, { id: result.insertId, ...newNote });
    });
};

Note.findById = function (noteId, callback) {
    sql.query(`SELECT * FROM notes WHERE id = ${noteId}`, function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        if (result.length) {
            console.log("found note: ", result[0]);
            callback(null, result[0]);
            return;
        }

        // not found Note with the id
        callback({ kind: "not_found" }, null);
    });
};

Note.list = function(callback){
    sql.query("SELECT * FROM notes", function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        console.log("notes: ", result);
        callback(null, result);
    });
};

Note.updateById = function (id, note, callback) {
    sql.query(
        "UPDATE notes SET title = ?, note = ?, updated_at = ? WHERE id = ?",
        [note.title, note.note, (new Date()).getTime(), id],
        function(error, result){
            if (error) {
                console.log("error: ", error);
                callback(null, error);
                return;
            }

            if (result.affectedRows === 0) {
                // not found Note with the id
                callback({ kind: "not_found" }, null);
                return;
            }

            console.log("updated note: ", { id: id, ...note });
            callback(null, { id: id, ...note });
        }
    );
};

Note.remove = function (id, callback) {
    sql.query("DELETE FROM notes WHERE id = ?", id, function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        if (result.affectedRows === 0) {
            // not found Note with the id
            callback({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted note with id: ", id);
        callback(null, result);
    });
};

Note.format = function(callback){
    sql.query("DELETE FROM notes", function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        console.log(`deleted ${result.affectedRows} notes`);
        callback(null, result);
    });
};

Note.move = function(categoryId, noteId, callback){
    console.log(categoryId)
    sql.query("UPDATE notes SET category_id = ? WHERE id = ?", [categoryId, noteId], function(error, result){
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        console.log(`moved ${result.affectedRows} notes`);
        callback(null, result);
    });
};

module.exports = Note;
