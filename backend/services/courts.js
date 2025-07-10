const { insertCourt, findCourt, updateCourt, deleteCourt } = require('../data/courts')

async function createCourt (data) {

    const { courtNumber, courtLevel } = data
    let status = true;
    let queue = []

     // confirmação se court já existe
    const user = await findCourt({courtNumber})
    if (user && courtNumber === user.courtNumber) {
       return {message: "Court number already exists."}
    }
    // confirmação de que o tipo de dados courtNumber é bem inserido
    if (!courtNumber || typeof courtNumber !== 'number') {
        return { message: "Invalid court number" }
    }
    // confirmação de que o tipo de dados courtLevel é bem inserido
    if (courtLevel && typeof courtLevel !== 'string') {
        return { message: "Invalid court level" }
    }
    // Enviar os seguintes dados para a DB
    const courtData = { status, courtNumber, queue, courtLevel }
    // se passar todas as confirmações, executa a função
    const id = await insertCourt(courtData);
    
    return { message: "Court created", id }
}

module.exports = { createCourt }