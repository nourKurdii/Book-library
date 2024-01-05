import {bookModel} from './book'
import publisherModel from './publisher'
import commentModel from './comment'

publisherModel.hasMany(bookModel, {foreignKey: 'publisher_id'})
bookModel.belongsTo(publisherModel, {foreignKey: 'publisher_id'})

commentModel.belongsTo(bookModel, {foreignKey: 'book_id'})
bookModel.hasMany(commentModel, {foreignKey: 'book_id'})


export { bookModel, publisherModel, commentModel }