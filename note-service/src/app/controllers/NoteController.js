const Note = require("../models/NoteModel");

// Create and Save a new Note
exports.create = function (request, response) {
    response.contentType('application/json');

    // Validate request
    if (!request.body) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Note
    const note = new Note({
        category_id: request.body.category_id,
        title: request.body.title,
        note: request.body.note
    });

    // Save Note in the database
    Note.create(note, function (error, data) {
        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Note."
            });
        } else {
            response.send(JSON.stringify({
                status: true,
                data: data
            }));
        }
    });
};

// Retrieve all Notes from the database.
exports.list = function (request, response) {
    Note.list(function (error, data) {
        response.contentType('application/json');

        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving notes."
            });
        } else {
            response.send(JSON.stringify({
                status: true,
                data: data
            }));
        }
    });
};

// Find a single Note with a noteId
exports.findOne = function (request, response) {
    response.contentType('application/json');

    Note.findById(request.params.noteId, function (error, data) {
        if (error) {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Note with id ${request.params.noteId}.`
                });
            } else {
                response.status(500).send({
                    message: "Error retrieving Note with id " + request.params.noteId
                });
            }
        } else {
            response.send(JSON.stringify({
                status: true,
                data: data
            }));
        }
    });
};

// Update a Note identified by the noteId in the request
exports.update = function (request, response) {
    response.contentType('application/json');

    // Validate Request
    if (!request.body) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Note.updateById(
        request.params.noteId,
        new Note(request.body),
        function (error, data) {
            if (error) {
                if (error.kind === "not_found") {
                    response.status(404).send({
                        message: `Not found Note with id ${request.params.noteId}.`
                    });
                } else {
                    response.status(500).send({
                        message: "Error updating Note with id " + request.params.noteId
                    });
                }
            } else {
                response.send(JSON.stringify({
                    status: true,
                    data: data
                }));
            }
        }
    );
};

// Delete a Note with the specified noteId in the request
exports.delete = function (request, response) {
    response.contentType('application/json');

    Note.remove(request.params.noteId, function (error, data) {
        if (error) {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Note with id ${request.params.noteId}.`
                });
            } else {
                response.status(500).send({
                    message: "Could not delete Note with id " + request.params.noteId
                });
            }
        } else {
            response.send({message: `Note was deleted successfully!`});
        }
    });
};

// Delete all Notes from the database.
exports.format = function (request, response) {
    response.contentType('application/json');

    Note.format(function (error, data) {
        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while removing all notes."
            });
        } else {
            response.send({message: `All Notes were deleted successfully!`});
        }
    });
};


//Move notes
exports.move = function (request, response) {
    response.contentType('application/json');

    Note.move(request.params.categoryId, request.params.noteId, function (error, data) {
        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while moving note."
            });
        } else {
            response.send({message: `Note moved successfully!`});
        }
    });
};