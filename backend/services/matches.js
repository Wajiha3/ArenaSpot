const { insertMatch, findMatch, findAllMatches, updateMatch, deleteMatch } = require('../data/matches')
const { insertCourt, findCourt, findAllCourts, updateCourt, deleteCourt } = require('../data/courts')
const { ObjectId } = require('mongodb')
const { findUser, updateUser } = require('../data/user')

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
        finished: null,
        score: {
            teamA: null,
            teamB: null
        }
    }
    // Inserir match na DB com os dados recebidos
    const matchId = await insertMatch(matchData)
    // retornar id da match
    return matchId
}


async function finishMatch (matchId, winningTeam, score) {
    // find match por ID
    const match = await findMatch({ _id: new ObjectId(String(matchId)) })
     console.log('Match encontrado:', match) // -----> ESTA AQUI O PROBLEMA
    if (!match || match.status !== "In Progress") {
        throw new Error("Match not found or already finished.")
    }
   

    // definir teams
    const { teamA, teamB, courtId } = match;

    // Iniciar variaveis de vitoriosos e derrotados
    let losers = null;
    let winners = null;

    // validar score
    if (!score || typeof score.teamA !== 'number' || typeof score.teamB !== 'number'
        || score.teamA < 0 || score.teamA > 2 || score.teamB < 0 || score.teamB > 2 ||
        score.teamA === score.teamB || (score.teamA !== 2 && score.teamB !== 2)
        ) throw new Error ("Invalid Score")

    if ((winningTeam === "teamA" && score.teamA < score.teamB) ||
        (winningTeam === "teamB" && score.teamB < score.teamA)) {
        throw new Error ("Invalid Score: winning team doesn't match score.");
        }

    // atribuição de winningTeam
    if (winningTeam === "teamA") {
        losers = teamB;
        winners = teamA;
    } else if (winningTeam === "teamB") {
        losers = teamA;
        winners = teamB;
    } else {
        throw new Error("Invalid winning team.");
    }

    // Buscar os dados dos users vencedores e derrotados
    const winner1 = await findUser({ _id: new ObjectId(String(winners[0]._id)) });
    const winner2 = await findUser({ _id: new ObjectId(String(winners[1]._id)) });
    const loser1 = await findUser({ _id: new ObjectId(String(losers[0]._id)) });
    const loser2 = await findUser({ _id: new ObjectId(String(losers[1]._id)) });

    const winnerUsers = [winner1, winner2];
    const loserUsers = [loser1, loser2];

    // Calcula média dos pontos por equipa
    const avgWinnersPoints = (winner1.points + winner2.points) / 2
    const avgLosersPoints = (loser1.points + loser2.points) / 2

    // Atualizar pontos vencedores
    for (const winner of winnerUsers) {
        await updateUserStats(winner._id, true, avgWinnersPoints, avgLosersPoints);
    }

    // Atualizar pontos derrotados
    for (const loser of loserUsers) {
        await updateUserStats(loser._id, false, avgLosersPoints, avgWinnersPoints)
    }

    // Buscar novamente os vencedores mas atualizados
    const updatedWinner1 = await findUser({ _id: winner1._id });
    const updatedWinner2 = await findUser({ _id: winner2._id });
    const updatedWinners = [updatedWinner1, updatedWinner2];

    // Atualiza match:
    match.status = "Finished";
    match.winningTeam = winningTeam;
    match.finished = new Date();
    match.score = score

    // Update in the DB
    await updateMatch({_id: new ObjectId(String(matchId))}, match);

    // importar court específico por ID para consultar a queue
    const court = await findCourt({_id: new ObjectId(String(courtId))})
    if (!court) throw new Error("Court not found.")

    // Colocar vencedores no início da queue
    court.queue = [...updatedWinners, ...court.queue]

    // Atualizar court com nova queue
    await updateCourt(
    { _id: court._id },
    { queue: court.queue }
    )

    // Se queue não tiver +2 jogadores para jogar
    if (court.queue.length < 2) {
        return { message: "Match finished. Waiting for more players..."}
    }

    return { message: "Match finished. Winners moved to front of queue." }
}


async function updateUserStats (userId, userWin, teamAvg, opponentAvg) {
    const user = await findUser({ _id: new ObjectId(String(userId))})
    if (!user) return

    // pontos de participação
    let pointsGained = 3; 

    const updateProperties = {
        gamesPlayed: (user.gamesPlayed + 1),
        wins: user.wins,
        losses: user.losses
    }

    if (userWin === true) {
        pointsGained += 5;
        updateProperties.wins += 1
    }

    if (userWin === false) {
        updateProperties.losses += 1
    }

    if (userWin === true && teamAvg < opponentAvg) {
        pointsGained += 2;
    }

    await updateUser (
        { _id: user._id },
        { points: (user.points + pointsGained),
            ...updateProperties
        }
    )
}


module.exports = { startMatch, finishMatch, updateUserStats }
