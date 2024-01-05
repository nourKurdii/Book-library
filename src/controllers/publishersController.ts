import { bookModel, publisherModel, commentModel } from '../models/modelsRelations'
import { publisherInstance } from '../models/publisher'

// add publisher
async function addNewPublisher(publisherData: Partial<publisherInstance>): Promise<any> {
    const { name } = publisherData
    if (!name) {
        throw new Error('Name is required for the publisher')
    }
    const existingPublisher = await publisherModel.findOne({ where: { name: name } })
    if (existingPublisher) {
        throw new Error('Publisher with this name already exist')
    }
    try {
        console.log(publisherData)
        const newPublisher = await publisherModel.create(publisherData)
        return newPublisher
    } catch (err) {
        throw err
    }
}
// get all publishers
async function getPublishers(): Promise<any> {
    try {
        const publishersArray = await publisherModel.findAll()
        return publishersArray
    }
    catch (err) {
        throw err
    }
}
// get one publisher by id
async function getSpecificPublisher(id: number): Promise<any> {
    try {
        const returnedPublisher = await publisherModel.findOne({ where: { id: id } })
        return returnedPublisher
    } catch (err) {
        throw err
    }
}

// delete publisher by id
async function deletePublisher(id: number) {
    try {
        let publisher = getSpecificPublisher(id)
        if (!publisher) {
            throw new Error(`Publisher with ID ${id} doesn't exist`)
        }
        await publisherModel.destroy({ where: { id: id } })
    } catch (err) {
        throw err
    }
}

// get publisher books
async function getPublisherBooks(id: number): Promise<any> {
    try {
        let publisher = getSpecificPublisher(id)
        if (!publisher) {
            throw new Error(`Publisher with ID ${id} doesn't exist`)
        }
        const returnedPublisher = await publisherModel.findByPk(id, {
            include: [bookModel]
        })
        let books = returnedPublisher["books"]
        return books
    } catch (err) {
        throw err
    }
}
export default {
    addNewPublisher,
    getPublishers,
    getSpecificPublisher,
    deletePublisher,
    getPublisherBooks
}