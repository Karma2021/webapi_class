const Book = require('../models/Book')

const getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.json(books))
        .catch(next)
}
const createBooks = (req, res, next) => {
    Book.create(req.body)
        .then((book) => res.status(201).json(book))
        .catch(next)
}
const deleteAllBooks = (req, res, next) => {
    Book.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)

}
const getABookById = (req, res, next) => {

    Book.findById(req.params.book_id)
        .then((book) => {

            //Custom error
            if (!book) {
                res.status(404).json({ error: 'Book not found' })
            }

            res.json(book)
        })
        .catch(next)

}
const updateABookById = (req, res, next) => {

    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) return res.status(404).json({ error: "Book not found." })
            book.reviews = book.reviews.map((r) => {
                if (r.id === req.params.review_id) { // _id is of Object type and review_id is of String type, So, === can't be used. Later is id is of type string.
                    r.text = req.body.text
                }
                return r
            })
            book.save()
                .then(book => {
                    res.json(book.reviews.id(req.params.review_id))
                })
                .catch(next)
        })
        .catch(next)

}
const deleteABookById = (req, res, next) => {
    Book.findByIdAndDelete(req.params.book_id)
        .then((reply) => res.json(reply)) //res.status(204).end()
        .catch(next)
}

module.exports = {
    getAllBooks,
    createBooks,
    deleteAllBooks,
    getABookById,
    updateABookById,
    deleteABookById
}
