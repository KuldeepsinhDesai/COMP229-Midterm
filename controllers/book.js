// create a reference to the model
let Book = require('../models/book');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function (req, res, next) {
    Book.find((err, bookList) => {
        // console.log(bookList);
        if (err) {
            return console.error(err);
        }
        else {
            res.render('book/list', {
                title: 'Book List',
                books: bookList
            })
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {

    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details',
                book: bookToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    res.render('book/add_edit', {
        title: 'Add Book',
        book: {}
    })

}

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    const { Title, Description, Price, Author, Genre } = req.body;
    let bookToSave = new Book();

    bookToSave.Title = Title;
    bookToSave.Description = Description;
    bookToSave.Price = Price;
    bookToSave.Author = Author;
    bookToSave.Genre = Genre;
    bookToSave.save(function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/book/list');
        }
    });


}

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {

    // ADD YOUR CODE HERE
    let id = req.params.id;
    Book.findById(id, function (err, result) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('book/add_edit', {
                title: 'Edit Book',
                book: result
            })
        }
    });


}

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    const { id, Title, Description, Price, Author, Genre } = req.body;

    let bookToUpdate = {};
    bookToUpdate.Title = Title;
    bookToUpdate.Description = Description;
    bookToUpdate.Price = Price;
    bookToUpdate.Author = Author;
    bookToUpdate.Genre = Genre;
    console.log(bookToUpdate);
    Book.update({ _id: id }, bookToUpdate, function (err, result) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/book/list');
        }
    })


}

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {

    console.log("delete");
    //res.redirect('/book/list');
    // ADD YOUR CODE HERE
    let id = req.params.id;
    Book.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/book/list');
        }
    });

}