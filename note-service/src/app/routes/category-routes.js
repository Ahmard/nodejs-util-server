module.exports = function (app) {
    const categories = require("../controllers/CategoryController");

    // Create a new Customer
    app.post("/api/categories", categories.create);

    // Retrieve all Customers
    app.get("/api/categories", categories.list);

    // Open category and read its notes
    app.get("/api/categories/:categoryId/open", categories.open);

    // Retrieve a single Customer with Categoryd
    app.get("/api/categories/:categoryId", categories.findOne);

    // Update a Customer with Categoryd
    app.put("/api/categories/:categoryId", categories.update);

    // Delete a Customer with Categoryd
    app.delete("/api/categories/:categoryId", categories.delete);

    // Create a new Customer
    app.delete("/api/categories", categories.format);
};