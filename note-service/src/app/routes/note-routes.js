module.exports = function (app) {
    const notes = require("../controllers/NoteController");

    // Create a new Note
    app.post("/api/notes", notes.create);

    // Retrieve all Notes
    app.get("/api/notes", notes.list);

    // Retrieve a single Note with NoteId
    app.get("/api/notes/:noteId", notes.findOne);

    // Update a Note with NoteId
    app.put("/api/notes/:noteId", notes.update);

    // Delete a Note with NoteId
    app.delete("/api/notes/:noteId", notes.delete);

    // Create a new Note
    app.delete("/api/notes", notes.format);

    //Move Note
    app.get('/api/notes/:noteId/move/:categoryId', notes.move);
};