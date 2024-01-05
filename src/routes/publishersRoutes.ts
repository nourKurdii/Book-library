import express, { Request, Response } from 'express'
const router = express.Router()
import publisherController from '../controllers/publishersController'
import { bookModel } from '../models/modelsRelations'
import { publisherInstance } from '../models/publisher'
import { sessionMiddleware } from '../../src/middlewares/sessionMiddleware'

// post /publishers
router.post('/', sessionMiddleware, async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const publisherData: publisherInstance = req.body
        const newPublisher = await publisherController.addNewPublisher(publisherData)
        res.status(201).json(newPublisher)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }

})


// get /publishers
router.get('/', sessionMiddleware, async (req: Request, res: Response) => {

    try {
        const publishersArray = await publisherController.getPublishers()
        res.status(200).json(publishersArray)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch publishers', details: err.message })
    }

})


// get /publishers/:id
router.get('/:id', sessionMiddleware, async (req: Request, res: Response) => {
    const publisherId = Number(req.params.id)

    try {
        const publisher = await publisherController.getSpecificPublisher(publisherId)
        if (publisher) {
            res.status(200).json(publisher)
        } else {
            res.status(404).json({ error: 'Publisher not found' })
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch publisher details', details: err.message })
    }


})


// delete /publishers/:id
router.delete('/:id', sessionMiddleware, async (req: Request, res: Response) => {
    try {
        const publisherId = Number(req.params.id)
        const booksCount = await bookModel.count({ where: { publisher_id: publisherId } })
        if (booksCount > 0) {
            res.status(400).send('Publisher has associated books. Cannot delete.')
        } else {
            await publisherController.deletePublisher(publisherId)
            res.status(200).send('publisher deleted succesfully')
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete publisher', details: err.message })
    }
})

// get /publishers/:id/books
router.get('/:id/books', sessionMiddleware, async (req: Request, res: Response) => {
    try {
        const publisherId = Number(req.params.id)
        const bookArray = await publisherController.getPublisherBooks(publisherId)
        res.status(200).json(bookArray)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch publisher books', details: err.message })
    }
})

export default router