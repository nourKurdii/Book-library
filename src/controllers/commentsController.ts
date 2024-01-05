import { bookModel, commentModel } from '../models/modelsRelations'
import { commentInstance } from '../models/comment'
import booksController from './booksController';

// add comment
async function addNewComment(commentData: Partial<commentInstance>): Promise<any> {
    try {
        if (!commentData.book_id) {
            throw new Error('Book ID is required for adding a comment')
        }
        const existingBook = await booksController.getSpecificBook(commentData.book_id)
        if (!existingBook) {
            throw new Error('Book not found with the provided ID')
        }
        const newComment = await commentModel.create(commentData)
        return newComment
    } catch (err) {
        throw err;
    }
}

// delete comment
async function deleteComment(id: number) {
    try {
        await commentModel.destroy({ where: { id: id } })
    } catch (err) {
        throw err
    }
}

export default {
    addNewComment,
    deleteComment
}