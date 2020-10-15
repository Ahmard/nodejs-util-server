module.exports = function (app) {
    const categories = require("../controllers/CategoryController");

    // Create a new Category
    app.post("/api/categories", categories.create);

    // Retrieve all Categories
    app.get("/api/categories", categories.list);

    // Open category and read its notes
    app.get("/api/categories/:categoryId/open", categories.open);

    // Retrieve a single Category
    app.get("/api/categories/:categoryId", categories.findOne);

    // Rename a Category
    app.put("/api/categories/:categoryId", categories.rename);

    // Delete a Category
    app.delete("/api/categories/:categoryId", categories.delete);

    // Create a new Category
    app.delete("/api/categories", categories.format);
};