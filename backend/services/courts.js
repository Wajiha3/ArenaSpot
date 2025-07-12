const { insertCourt, findCourt, updateCourt, deleteCourt } = require('../data/courts')
const { startMatch } = require('../services/matches');
const { ObjectId } = require('mongodb')

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


async function joinQueue (courtId, user) {

    // selecionar court desejado
    const court = await findCourt({ _id: new ObjectId(String(courtId)) });
    // se não encontrares o court
    if (!court) {
        throw new Error("Court not found.");
    }
    // função para encontrar se algum elemento (user com o seu id) está na queue
    const alreadyInQueue = court.queue.find(e => String(e._id) === String(user._id))
    // se user já estiver na queue escolhida
    if (alreadyInQueue) {
        throw new Error("Player already in queue.")
    }
    
    // Confirmar código se funciona
    if (court.level !== user.level) {
        throw new Error("Court level not authorized.")
    }

    // adicionar user à queue
    court.queue.push(user)

    // update court queue
    await updateCourt(
        {_id: court._id},
        {queue: court.queue}
    )

    let matchReady = false

    if (court.queue.length >= 4) {
        matchReady = true
    }

    return {message: "Player added to queue!", matchReady}
}

async function leaveQueue(courtId, user) {

    // selecionar court desejado
    const court = await findCourt({ _id: new ObjectId(String(courtId)) });
    // se não encontrares o court
    if (!court) {
        throw new Error("Court not found.");
    }
    // função para encontrar se algum elemento (user com o seu id) está na queue
    const alreadyInQueue = court.queue.find(e => String(e._id) === String(user._id))
    // se user já estiver na queue escolhida
    let updatedQueue = court.queue
    if (alreadyInQueue) {
        updatedQueue = court.queue.filter( (e) => String(e._id) !== String(user._id))
    }

    await updateCourt(
        { _id: court._id },
        { queue: updatedQueue });

    return {message: "Player removed from queue."}
}

module.exports = { createCourt, joinQueue, leaveQueue }