// PENSAR EM CRUD - CREATE, READ, UPDATE, DELETE

const { ObjectId } = require("mongodb");
const {getCollection, getConnection, closeConnection} = require("./mongodb")

// Create Match
async function insertMatch (data) {
    const collection = await getCollection("matches");
    const create = await collection.insertOne(data)
    return create.insertedId
}

// Read Match
async function findMatch (data) {
    const collection = await getCollection("match");
    const result = await collection.findOne(data)
    return result
}

// Read All Matches
async function findAllMatches () {
    const collection = await getCollection("match");
    const result = await collection.find().toArray()
    return result
}

async function findMatchesById (userId) {
    const collection = await getCollection("match");
    const id = new ObjectId(String(userId))
    const result = await collection({
        $or: [
            { teamA: id},
            { teamB: id}
        ]
    }).sort({started: -1}).toArray();
    return result
}

// Update Match
async function updateMatch (filter, update) {
    const collection = await getCollection("match");
    const result = await collection.updateOne(filter, { $set: update })
    return result
}

// Delete User
async function deleteMatch (data) {
    const collection = await getCollection("match");
    await collection.deleteOne(data)
}

module.exports = { insertMatch, findMatch, findAllMatches, findMatchesById, updateMatch, deleteMatch }