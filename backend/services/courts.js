const { insertCourt, findCourt, updateCourt, deleteCourt } = require('../data/courts')

const errors = {
    message: "The data is invalid",
    error: "This court Number already exists"
}

async function createCourt (data) {

    const { status, courtNumber, queue } = data

     // confirmação se court já existe
    const user = await findCourt({courtNumber})
    if (user && courtNumber === user.courtNumber) {
       return {message: errors.message, error: errors.error}
    }

    status = true;
}