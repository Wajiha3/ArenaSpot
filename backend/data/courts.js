// PENSAR EM CRUD - CREATE, READ, UPDATE, DELETE

const {getCollection, getConnection, closeConnection} = require("./mongodb")

// Create Court
async function insertCourt (data) {
    const collection = await getCollection("courts");
    const create = await collection.insertOne(data)
    return create.insertedId
}

// Read Court
async function findCourt (data) {
    const collection = await getCollection("courts");
    const result = await collection.findOne(data._id)
    return result
}

// Update Court
async function updateCourt (filter, update) {
    const collection = await getCollection("courts");
    const result = await collection.updateOne(filter, { $set: update })
    return result
}

// Delete Court
async function deleteCourt (data) {
    const collection = await getCollection("courts");
    await collection.deleteOne(data)
}

module.exports = { insertCourt, findCourt, updateCourt, deleteCourt }