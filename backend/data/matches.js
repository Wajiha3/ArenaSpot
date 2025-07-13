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
async function findMatch (matchId) {
    const collection = await getCollection("matches");
    const result = await collection.findOne(matchId)
    return result
}

// Read All Matches
async function findAllMatches () {
    const collection = await getCollection("matches");
    const result = await collection.find().toArray()
    return result
}

// Find Matches By Id
async function findMatchesById (userId) {
    const collection = await getCollection("matches");
    const id = new ObjectId(String(userId))
    const result = await collection.find({
        $or: [
            { "teamA._id": id},
            { "teamB._id": id}
        ]
    }).sort({started: -1}).toArray();
    console.log("Matches found for user ID:", userId, result);
    return result
}

// Find Matches In Progress By Court
async function findInProgressMatchesByCourt (courtId) {
    const collection = await getCollection("matches");
    const id = new ObjectId(String(courtId));
    const result = await collection.findOne({
        courtId: id,
        status: "In Progress"
    })
    return result
}

// Update Match
async function updateMatch (filter, update) {
    const collection = await getCollection("matches");
    const result = await collection.updateOne(filter, { $set: update })
    return result
}

// Delete User
async function deleteMatch (data) {
    const collection = await getCollection("matches");
    await collection.deleteOne(data)
}

module.exports = { insertMatch, findMatch, findAllMatches, findMatchesById, updateMatch, deleteMatch, findInProgressMatchesByCourt }