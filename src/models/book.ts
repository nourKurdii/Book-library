import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/db'

interface bookInstance extends Model {
    title: string
    isbn: string
    publisher_id: number
    year?: number
    author?: string
    pages?: number
}
const bookModel = sequelize.define<bookInstance>('books',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        publisher_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
        },
        author: {
            type: DataTypes.STRING,
        },
        pages: {
            type: DataTypes.INTEGER,
        }
    }, {
    timestamps: false,
    tableName: 'books'
})
bookModel.beforeCreate(async (thisBook: any) => {
    if (thisBook.changed('isbn') || thisBook.isNewRecord) {
        const existingBook = await bookModel.findOne({ where: { isbn: thisBook.isbn } })
        if (existingBook) {
            throw new Error('Book with this ISBN already exists')
        }
    }
})
export {
    bookInstance,
    bookModel
} 