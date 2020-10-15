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
    let templateRenameCategory = Handlebars.compile($('#template-rename-category').html());

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
            categoryLists = categories;
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
        if(confirm('All notes in this directory will be deleted with it\n Do you really want to delete?')){
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

                fetchCategories();

                $modal.modal('hide');
            });
        }
    };

    renameCategory = function (categoryId) {
        let category = findCategory(categoryId);
        $modal.find('.modal-title').html('Rename category');
        $modal.find('.modal-footer').hide();
        $modal.find('.modal-body').html(templateRenameCategory({
            category: category.category
        }));
        $modal.on('shown.bs.modal', function () {
            let $form = $('#form-rename-category');
            $form.submit(function (event) {
                event.preventDefault();

                let newCategoryName = $('input[name="category-name"]').val();

                $form.find('button[type="submit"]')
                    .addClass('disabled')
                    .attr('disabled', 'disabled')
                    .html('Saving...');

                $.ajax({
                    url: '/api/categories/' + categoryId,
                    method: 'PUT',
                    data: {
                        name: newCategoryName
                    },
                    error: function (error) {
                        alert('Error occurred');
                        console.log(error);
                    }
                }).then(function (response) {
                    let category = findCategory(categoryId);

                    categoryLists[category.key].name = newCategoryName;

                    //Add to category lists
                    $('#breadcrumb-item-'+categoryId).html(newCategoryName);

                    $modal.modal('hide');
                });
            });
        });

        $modal.modal('show');
    };
});