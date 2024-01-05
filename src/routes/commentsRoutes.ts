import express, { Request, Response } from 'express'
const router = express.Router()
import commentsController from '../controllers/commentsController'
import { commentInstance } from '../models/comment'
import { sessionMiddleware } from '../../src/middlewares/sessionMiddleware'

// post /comments
router.post('/', sessionMiddleware, async (req: Request, res: Response) => {
    try {
        const commentData: Partial<commentInstance> = req.body
        const newComment = await commentsController.addNewComment(commentData)
        if (newComment.error) {
            res.status(newComment.status).json({ error: newComment.error })
        } else {
            res.status(201).json(newComment)
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to add a new comment', details: err.message })
    }
})


// delete /comments/:id
router.delete('/:id', sessionMiddleware, async (req: Request, res: Response) => {
    try {
        const commentId = Number(req.params.id)
        await commentsController.deleteComment(commentId)
        res.status(200).json('comment deleted succesfully')
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete comment', details: err.message })
    }
})

export default router
