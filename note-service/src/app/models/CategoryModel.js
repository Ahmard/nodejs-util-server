const sql = require("../database/connector.js");

// constructor
const Category = function (category) {
    this.name = category.name;
    this.created_at = (new Date()).getTime();
    this.updated_at = (new Date()).getTime();
};

Category.create = function (newCategory, callback) {
    sql.query(
        "INSERT INTO categories (name, created_at, updated_at) VALUES (?, ?, ?);",
        [newCategory.name, `${newCategory.created_at}`, `${newCategory.updated_at}`],
        function (error, result) {
            if (error) {
                console.log("error: ", error);
                callback(error, null);
                return;
            }

            console.log("created category: ", {id: result.insertId, ...newCategory});
            callback(null, {id: result.insertId, ...newCategory});
        });
};

Category.findById = function (categoryId, callback) {
    sql.query(`SELECT * FROM categories WHERE id = ${categoryId}`, function (error, result) {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        if (result.length) {
            console.log("found category: ", result[0]);
            callback(null, result[0]);
            return;
        }

        // not found Category with the id
        callback({kind: "not_found"}, null);
    });
};

Category.open = function (categoryId, callback) {
    sql.query(`SELECT * FROM notes WHERE category_id = ${categoryId}`, function (error, result) {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        //console.log("found category: ", result[0]);
        callback(null, result);
    });
};

Category.list = function (callback) {
    sql.query("SELECT * FROM categories", function (error, result) {
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        console.log("categories: ", result);
        callback(null, result);
    });
};

Category.updateById = function (id, category, callback) {
    sql.query(
        "UPDATE categories SET name = ?, updated_at = ? WHERE id = ?",
        [category.name, (new Date()).getTime(), id],
        function (error, result) {
            if (error) {
                console.log("error: ", error);
                callback(null, error);
                return;
            }

            if (result.affectedRows === 0) {
                // not found Category with the id
                callback({kind: "not_found"}, null);
                return;
            }

            console.log("updated category: ", {id: id, ...category});
            callback(null, {id: id, ...category});
        }
    );
};

Category.remove = function (id, callback) {
    sql.query("DELETE FROM categories WHERE id = ?", id, function (error, result) {
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        if (result.affectedRows === 0) {
            // not found Category with the id
            callback({kind: "not_found"}, null);
            return;
        }

        console.log("deleted category with id: ", id);
        callback(null, result);
    });
};

Category.format = function (callback) {
    sql.query("DELETE FROM categories", function (error, result) {
        if (error) {
            console.log("error: ", error);
            callback(null, error);
            return;
        }

        console.log(`deleted ${result.affectedRows} categories`);
        callback(null, result);
    });
};

module.exports = Category;
