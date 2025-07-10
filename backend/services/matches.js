const { insertMatch, findMatch, findAllMatches, updateMatch, deleteMatch } = require('../data/matches')

async function startMatch(court) {
    // se partida tiver menos de 4 elementos na queue
    if (court.queue.length < 4) {
        return null
    }
    // remove os 4 jogadores da queue
    const players = court.queue.splice(0,4)

    // distribuição dos players pelas equipas
    const teamA = [players[0], players[1]]
    const teamB = [players[2], players[3]]

    // atualização da queue do court
    await updateCourt(
        { _id: court._id },
        { queue: court.queue })

    // dados que a partida recebe
    const matchData = {
        courtId: court._id,
        teamA,
        teamB,
        status: "In Progress",
        winningTeam: null,
        started: new Date(),
        finished: null
    }
    // Inserir match na DB com os dados recebidos
    const matchId = await insertMatch(matchData)
    // retornar id da match
    return matchId
}

