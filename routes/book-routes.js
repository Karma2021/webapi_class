const express = require('express')

const route = express.Router()
const Book = require('../models/Book')

const bookController = require('../controllers/book-controller')
const reviewController = require('../controllers/review-controller')



route.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBooks)
    .put((req, res) => {
        res.status(405).json({ error: "Put request is not allowed" })
    })
    .delete(bookController.deleteAllBooks)


route.route('/:book_id')
    .get(bookController.getABookById)
    .post((req, res) => {
        res.status(405).json({ error: 'POST REQUEST apne bap se lekar ana' })
    })
    .put(bookController.updateABookById)
    .delete(bookController.deleteABookById)

route.route('/:book_id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReviews)
    .put((req, res) => {
        res.status(405).json({ error: "Put request is not allowed" })
    })
    .delete(reviewController.deleteAllReviews)

route.route('/:book_id/reviews/:reviews_id')
    .get(reviewController.getReviewById)
    .put(reviewController.updateReviewById)
    .post((req, res) => {
        res.status(405).json({ error: "Put request is not allowed" })
    })
    .delete(reviewController.deleteReviewById)
module.exports = route