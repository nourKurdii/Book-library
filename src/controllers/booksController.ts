import { bookModel, publisherModel, commentModel } from '../models/modelsRelations'
import { sequelize } from '../../config/db'
import { sessionInstance } from '../models/session'
import { bookInstance } from '../models/book'

// add book
async function addNewBook(sessionData: sessionInstance, bookData: Partial<bookInstance>): Promise<any> {
    const { title, isbn } = bookData
    const publisher_id = sessionData.userId

    if (!title || !isbn) {
        throw new Error('Title and ISBN are required')
    }


    const existingPublisher = await publisherModel.findByPk(publisher_id)
    if (!existingPublisher) {
        throw new Error('Publisher with this ID does not exist')
    }

    try {
        const newBook = await bookModel.create({ ...bookData, ...{ publisher_id: publisher_id } })
        return newBook
    } catch (err) {
        throw err
    }



}
// get all books
async function getBooks(): Promise<any> {
    try {
        const booksArray = await bookModel.findAll({ include: [publisherModel, commentModel] })
        return booksArray
    }
    catch (err) {
        throw err
    }
}
// get one book by id
async function getSpecificBook(id: number): Promise<any> {
    try {
        const returnedBook = await bookModel.findByPk(id, { include: [publisherModel, commentModel] })
        return returnedBook
    } catch (err) {
        throw err
    }
}

// update book by id
async function updateBook(sessionData: sessionInstance, bookData: Partial<bookInstance>, id: number) {
    try {
        let book = await getSpecificBook(id)
        if (!book) {
            throw new Error(`Book with ID ${id} doesn't exist`);
        }

        if (book.publisher_id != sessionData.userId) {
            throw new Error(`You don't have permission to update this book`);
        }
        await bookModel.update(bookData, { where: { id: id } })
    } catch (err) {
        throw err
    }
}

// delete book by id
async function deleteBook(sessionData: sessionInstance, id: number) {
    let book = await getSpecificBook(id)
    if (!book) {
        throw new Error(`Book with ID ${id} doesn't exist`)
    }

    if (book.publisher_id != sessionData.userId) {
        throw new Error(`You don't have permission to delete this book`)
    }
    try {
        await bookModel.destroy({ where: { id: id } })
    } catch (err) {
        throw err
    }
}

// get top rated 
async function topRatedBooks(): Promise<any> {
    try {
        const topRatedBooks = await bookModel.findAll({

            attributes: [
                'id',
                'title',
                'isbn',
                'year',
                'author',
                'pages',
                [sequelize.literal('(SELECT AVG(stars) FROM comments WHERE stars IS NOT NULL AND comments.book_id = books.id)'), 'avgStars']
            ],
            order: [[sequelize.literal('avgStars'), 'DESC']]
        });
        console.log(topRatedBooks)
        return topRatedBooks
    } catch (err) {
        throw err
    }
}


export default {
    addNewBook,
    getBooks,
    getSpecificBook,
    updateBook,
    deleteBook,
    topRatedBooks
}