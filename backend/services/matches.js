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

async function finishMatch (matchId, winningTeam) {
    // find match por ID
    const match = await findMatch({ _id: new ObjectId(String(matchId)) })
    if (!match || match.status !== "In Progress") {
        throw new Error("Match not found or already finished.")
    }
    // Atualiza match:
    match.status = "Finished";
    match.winningTeam = winningTeam;
    match.finished = new Date();
    // Update in the DB
    await updateMatch({_id: matchId}, match);

    // Iniciar variaveis de vitoriosos e derrotados
    let losers = null;
    let winners = null;

    // atribuição de winningTeam
    if (winningTeam === "teamA") {
        losers = match.teamB;
        winners = match.teamA;
    } else if (winningTeam !== "teamA") {
        losers = match.teamB;
        winners = match.teamA;
    } else {
        throw new Error("Invalid winning team.");
    }

    // Se queue não tiver +2 jogadores para jogar
    if (court.queue.length < 2) {
        return { message: "Match finished. Waiting for more players..."}
    }

    // ir buscar os 2 próximos jogadores
    const player1 = court.queue[0];
    const player2 = court.queue[1];
    court.queue = court.queue.slice(2);

    // novo jogo com os vencedores do passado
    const newMatch = {
        courtId: court._id,
        teamA: winners,
        teamB: [player1, player2],
        status: "In Progress",
        winningTeam: null,
        started: new Date(),
        finished: null
    }
    // criar novo jogo com os novos dados
    await insertMatch(newMatch)

    // Atualizar court com nova queue
    await updateCourt({ _id: court._id }, { queue: court.queue });
}

module.exports = { startMatch, finishMatch }

