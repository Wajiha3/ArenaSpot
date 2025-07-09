// PENSAR EM CRUD - CREATE, READ, UPDATE, DELETE

const {getCollection, getConnection, closeConnection} = require("./mongodb")

// Create User
async function insertUser (data) {
    const collection = await getCollection("user");
    const create = await collection.insertOne(data)
    return create.insertedId
}

// Read User
async function findUser (data) {
    const collection = await getCollection("user");
    const result = await collection.findOne(data)
    return result
}

// Update User
async function updateUser (filter, update) {
    const collection = await getCollection("user");
    const result = await collection.updateOne(filter, { $set: update })
    return result
}

// Delete User
async function deleteUser (data) {
    const collection = await getCollection("user");
    await collection.deleteOne(data)
}

module.exports = { insertUser, findUser, updateUser, deleteUser }