import express, { Request, Response } from 'express'
const router = express.Router()
import booksController from '../controllers/booksController'
import { CustomRequest } from '../../src/middlewares/sessionMiddleware'
import { sessionMiddleware } from '../../src/middlewares/sessionMiddleware'
import { bookInstance } from '../models/book'

// post /books
router.post('/', sessionMiddleware, async (req: CustomRequest, res: Response) => {

    try {
        let bookData: Partial<bookInstance> = req.body
        let sessionData = req.session
        const newBook = await booksController.addNewBook(sessionData, bookData)
        res.status(201).json({ message: 'Book added successfully', book: newBook })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add a new book', details: err.message })
    }

})


// get /books
router.get('/', async (req: Request, res: Response) => {
    try {
        const booksArray = await booksController.getBooks()
        res.status(200).json(booksArray)
    } catch (err) {
        res.status(500).json({ error: 'Failed to get books', details: err.message })
    }
})


// get /books/:id
router.get('/:id', async (req: Request, res: Response) => {
    const bookId = Number(req.params.id)
    if (!isNaN(bookId)) {
        try {
            const book = await booksController.getSpecificBook(bookId)
            if (book) {
                res.status(200).json(book)
            } else {
                res.status(404).json({ error: 'Book not found' })
            }
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch book details', details: err.message })
        }
    } else {
        try {
            const topRatedBooks = await booksController.topRatedBooks();
            res.json(topRatedBooks)
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch top-rated books', details: err.message })
        }
    }


})


// put /books/:id
router.put('/:id', sessionMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        let sessionData = req.session
        const bookId = Number(req.params.id)
        const bookData: Partial<bookInstance> = req.body
        await booksController.updateBook(sessionData, bookData, bookId)
        res.status(200).json('Book updated succesfully')
    } catch (err) {
        res.status(500).json({ error: 'Failed to update book', details: err.message })
    }
})


// delete /books/:id
router.delete('/:id', sessionMiddleware, async (req: CustomRequest, res: Response) => {

    try {
        const bookId = Number(req.params.id)
        let sessionData = req.session
        await booksController.deleteBook(sessionData, bookId)
        res.status(200).json({ message: 'Book deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete book', details: err.message })
    }


})




export default router