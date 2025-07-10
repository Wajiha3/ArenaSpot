const { insertCourt, findCourt, updateCourt, deleteCourt } = require('../data/courts')

async function createCourt (data) {

    const { courtName, courtLevel } = data
    let status = true;
    let queue = []

    // confirmação de que o tipo de dados courtName é bem inserido
    if (typeof courtName !== 'string') {
        throw new Error("Invalid court name.")
    }
    // confirmação de que o tipo de dados courtLevel é bem inserido
    if (typeof courtLevel !== 'string') {
        throw new Error("Invalid court level.")
    }
     // confirmação se court já existe com aquele nome
    const court = await findCourt({courtName})
    if (court && courtName === court.courtName) {
       throw new Error("Court name already exists.")
    }
    // Enviar os seguintes dados para a DB
    const courtData = { status, courtName, queue, courtLevel }
    // se passar todas as confirmações, executa a função
    const id = await insertCourt(courtData);

    return id
}

module.exports = { createCourt }