const Category = require("../models/CategoryModel");

// Create and Save a new Category
exports.create = function (request, response) {
    response.contentType('application/json');

    // Validate request
    if (!request.body) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Category
    const category = new Category({
        name: request.body.name
    });

    // Save Category in the database
    Category.create(category, function (error, data) {
        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while creating the Category."
            });
        } else {
            response.send(JSON.stringify({
                status: true,
                data: data
            }));
        }
    });
};

// Retrieve all Categorys from the database.
exports.list = function (request, response) {
    Category.list(function (error, data) {
        response.contentType('application/json');

        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while retrieving categories."
            });
        } else {
            response.send(JSON.stringify({
                status: true,
                data: data
            }));
        }
    });
};

// Find a single Category with a categoryId
exports.findOne = function (request, response) {
    response.contentType('application/json');

    Category.findById(request.params.categoryId, function (error, data) {
        if (error) {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Category with id ${request.params.categoryId}.`
                });
            } else {
                response.status(500).send({
                    message: "Error retrieving Category with id " + request.params.categoryId
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

// Find a single Category with a categoryId
exports.open = function (request, response) {
    response.contentType('application/json');

    Category.open(request.params.categoryId, function (error, data) {
        if (error) {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Category with id ${request.params.categoryId}.`
                });
            } else {
                response.status(500).send({
                    message: "Error retrieving Category with id " + request.params.categoryId
                });
            }
        } else {
            response.end(JSON.stringify({
                status: true,
                data: data || []
            }));
        }
    });
};

// Update a Category identified by the categoryId in the request
exports.rename = function (request, response) {
    response.contentType('application/json');

    // Validate Request
    if (!request.body) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Category.rename(
        request.params.categoryId,
        new Category(request.body),
        function (error, data) {
            if (error) {
                if (error.kind === "not_found") {
                    response.status(404).send({
                        message: `Not found Category with id ${request.params.categoryId}.`
                    });
                } else {
                    response.status(500).send({
                        message: "Error updating Category with id " + request.params.categoryId
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

// Delete a Category with the specified categoryId in the request
exports.delete = function (request, response) {
    response.contentType('application/json');

    Category.remove(request.params.categoryId, function (error, data) {
        if (error) {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Category with id ${request.params.categoryId}.`
                });
            } else {
                response.status(500).send({
                    message: "Could not delete Category with id " + request.params.categoryId
                });
            }
        } else {
            response.send({message: `Category was deleted successfully!`});
        }
    });
};

// Delete all Categorys from the database.
exports.format = function (request, response) {
    response.contentType('application/json');

    Category.format(function (error, data) {
        if (error) {
            response.status(500).send({
                message:
                    error.message || "Some error occurred while removing all categories."
            });
        } else {
            response.send({message: `All Categorys were deleted successfully!`});
        }
    });
};
