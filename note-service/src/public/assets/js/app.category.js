let addCategory;
let openCategory;
let renameCategory;
let deleteCategory;
let updateCategory;
let fetchCategories;
let categoryLists = [];

$(function () {
    let $elCategories = $('#category');
    let htmlCategories = $('#template-category-index').html();
    let templateAddCategory = $('#template-add-category').html();
    let templateCategoryItem = Handlebars.compile($('#template-category-item').html());

    setTimeout(function () {
        fetchCategories();
    }, 100);

    fetchCategories = function () {
        $elRoot.html(htmlCategories);
        $elCategories = $('#category');
        $.ajax({
            url: '/api/categories',
            error: function (error) {
                alert('Error occurred');
                console.log(error);
            }
        }).then(function (response) {
            let categories = response.data;
            categoryLists = [...categoryLists, ...categories];
            //Remove loader
            $elCategories.html('');
            //Display categories
            categories.forEach(function (category) {
                $elCategories.append(templateCategoryItem({
                    category: category
                }));
            });
        });
    };

    let findCategory = function (categoryId) {
        for (let i = 0; i < categoryLists.length; i++) {
            if (categoryId === categoryLists[i].id) {
                return {
                    category: categoryLists[i],
                    key: i
                }
            }
        }

        return undefined;
    }

    addCategory = function(){
        $modal.find('.modal-title').html('Add category');
        $modal.find('.modal-footer').hide();
        $modal.find('.modal-body').html(templateAddCategory);
        $modal.on('shown.bs.modal', function () {
            let $formAddCategory = $('#form-add-category');
            $formAddCategory.off('submit').submit(function (event) {
                event.preventDefault();

                $formAddCategory.find('button[type="submit"]')
                    .text('Adding...')
                    .attr('disabled', 'disabled');

                $.ajax({
                    url: '/api/categories',
                    method: 'POST',
                    data: {
                        name: $formAddCategory.find('input[name="category-name"]').val(),
                    },
                    error: function (error) {
                        alert('Error occurred');
                        console.log(error);
                    }
                }).then(function (response) {
                    let category = response.data;
                    //Add to category lists
                    categoryLists.push(category);
                    //Append to categories
                    $elCategories.append(templateCategoryItem({
                        category: category
                    }));
                    $modal.modal('hide');
                });


            })
        });
        $modal.modal('show');
    };

    openCategory = function (categoryId) {
        $.ajax({
            url: '/api/categories/'+categoryId+'/open',
            method: 'GET',
        }).then(function (response) {
            let category = findCategory(categoryId).category;

            if(! response.status){
                return ;
            }

            currentCategory = category;

            initNotes(category, response.data);
        })
    }

    deleteCategory = function (categoryId) {
        $.ajax({
            url: '/api/categories/' + categoryId,
            method: 'DELETE',
            error: function (error) {
                alert('Error occurred');
                console.log(error);
            }
        }).then(function (response) {
            let category = response.data;
            //Remove category from list
            delete categoryLists[findCategory(categoryId).key];
            //Append to categories
            let $categoryItem = $('#category-item-' + categoryId);
            $categoryItem.addClass('border-danger').fadeOut(200, function () {
                $categoryItem.remove();
            });
            $modal.modal('hide');
        });
    };

    renameCategory = function (categoryId) {
        let category = findCategory(categoryId);
        $modal.find('.modal-title').html('Update category');
        $modal.find('.modal-footer').hide();
        $modal.find('.modal-body').html(templateEditCategory({
            category: category.category
        }));
        $modal.modal('show');
    };

    updateCategory = function (categoryId, button) {
        let categoryTitle = $('input[name="category-title"]').val();
        let categoryData = $('textarea[name="category-data"]').val();

        $(button).addClass('disabled')
            .attr('disabled', 'disabled')
            .html('Saving...');

        $.ajax({
            url: '/api/categories',
            method: 'PUT',
            data: {
                title: categoryTitle,
                category: categoryData,
            },
            error: function (error) {
                alert('Error occurred');
                console.log(error);
            }
        }).then(function (response) {
            let category = findCategory(categoryId);

            categoryLists[category.key].title = categoryTitle;
            categoryLists[category.key].category = categoryData;

            //Add to category lists
            $('#category-item-'+categoryId)
                .find('.category-title')
                .html(categoryTitle);

            $modal.modal('hide');
        });
    }
});