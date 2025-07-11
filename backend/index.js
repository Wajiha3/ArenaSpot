// importar módulo Express
const express = require('express')

// definição da app
const app = express()

// porta escolhida
const port = 3007

// Aceitar JSON
app.use(express.json())

const cors = require('cors')

app.use(cors());

const { createUser, loginUser, checkInUser } = require('./services/user')
const { authenticateToken } = require('./services/authToken')
const { findUser } = require('./data/user')
const { createCourt, joinQueue } = require('./services/courts')
const { findAllCourts, findCourt } = require('./data/courts')
const { findAllMatches, findMatchesById } = require('./data/matches')
const { ObjectId } = require('mongodb')
const { startMatch, finishMatch } = require('./services/matches')



// POST do registo com condições de verificação
app.post('/api/auth/signup', async (req, res) => {
    // criação de variável com o que se recebe do form
    const data = req.body
    // importar função para criar utilizador com o que receberes da data
    const result = await createUser(data);
    // se der erro, retornar erro
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: "User created.", _id: result});
})


// POST do login com condições de verificação
app.post('/api/auth/login', async (req, res) => {
    // criação de variável com o que se recebe do form
    const data = req.body
    // importar função de findUser com o que receberes do data
    const result = await loginUser(data);
    // se der erro, retornar erro
    if (result === "Email not found!") {
        return res.status(400).json({ error: result });
    }
    if (result === "Invalid password!") {
        return res.status(400).json({ error: result });
    }

    return res.status(200).json({ message: "Logged in", token: result });
});


// POST do Check-In
app.post('/api/checkin', async (req, res) => {
    try {
         // Aceder ao header: Authorization
        const authHeader = req.headers.authorization;
        // Remove "Bearer" e isola o token
        const token = authHeader
        // Verificar token e obter o utilizador autenticado
        const authenticatedUser = await authenticateToken(token);
        // Se não encontrar o User Autenticado
        if(!authenticatedUser) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        // Alteração do estado payment para TRUE
        await checkInUser(authenticatedUser._id)
        // Sucesso
        return res.status(200).json({ message: "Check-in done!" })

    } catch (err) {
        // Erro servidor
        console.error("Erro no check-in:", err);
        return res.status(500).json({ message: "Check-in error" });
    }
})

// POST da criação do court
app.post('/api/createcourt', async (req, res) => {
    try {
        // criação de variável com o que recebe do form
        const data = req.body
        // importar função para criar court com o que receber da data
        const result = await createCourt(data);

        return res.status(200).json({ message: "Court created.", _id: result })

    } catch (err) {
        // se der erro, retornar erro
            return res.status(400).json({ error: err.message })
        }  
})

//POST user join queue
app.post('/api/courts/:id/join', async (req, res) => {

    // court é escolhido em função do id nos parametros
    const courtId = req.params.id

    // Aceder ao header: Authorization
    const authHeader = req.headers.authorization;
    // Remove "Bearer" e isola o token --- NÃO SEI SE ESTÁ CERTO
    const token = authHeader
    // Verificar token e obter o utilizador autenticado
    const authenticatedUser = await authenticateToken(token);
    // Escolher utilizador por authenticatedUser
    const user = await findUser(authenticatedUser)

    try {
        const result = await joinQueue (courtId, user)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// get do utilizador específico
app.get('/api/user/:id', async (req, res) => {
    try {
         // Aceder ao header: Authorization
        const authHeader = req.headers.authorization;
        // Remove "Bearer" e isola o token
        const token = authHeader;
        console.log("Token:", token);
        // Verificar token e obter o utilizador autenticado
        const authenticatedUser = await authenticateToken(token);
        console.log("Authenticated User:", authenticatedUser);
        // Criar variável que mostre o id atual acedido pelos parâmetros
        const requestedId = req.params.id;

        // Verificar se o utilizador autenticado está a aceder ao próprio perfil
        if (authenticatedUser._id.toString() !== requestedId) {
            return res.status(403).json({ message: "Forbidden Access." });
        }
        // Obter os dados do utilizador
        const userData = authenticatedUser
        // Remover password antes de retornar
        delete userData.password;
        // Retorna o utilizador sem a password e depois de confirmado que está autenticado
        return res.status(200).json(userData);

    } catch (err) {
        // Erros
        const message = err.message || "Internal Error.";
        if (message === "Token not sent") return res.status(401).json({ message });
        if (message === "There isn't a session with the Token!") return res.status(403).json({ message });
        if (message === "Invalid Token!") return res.status(400).json({ message });
        if (message === "User not found.") return res.status(404).json({ message });

        // Erro interno servidor
        return res.status(500).json({ message });
    }   
})

// POST criação de match
app.post('/api/match/start', async (req, res) => {
    const { courtId } = req.body
    try {
        const court = await findCourt({ _id: new ObjectId(String(courtId)) })
        if (!court) {
            return res.status(404).json({ error: 'Court not found' })
        }
        const matchId = await startMatch( court )
        if (!matchId) {
            return res.status(400).json({ error: 'Not enough players to start a match.' })
        }

        res.json({ message: 'Match started', matchId})
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// POST de finalização de match
app.post('/api/match/:id/finish', async (req, res) => {
    // receber teamA/B como vencedora
    const { winningTeam } = req.body
    // receber id do match dos parametros
    const id = req.params.id
    // chamar função finishMatch
    try {
        const result = await finishMatch(id, winningTeam)
        res.status(200).json({ result })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// GET endpoint de obter lista de matches por id
app.get('/api/:id/matches', async (req, res) => {
    try {
        // Aceder ao header: Authorization
        const authHeader = req.headers.authorization;
        // Remove "Bearer" e isola o token
        const token = authHeader
        // Verificar token e obter o utilizador autenticado
        const authenticatedUser = await authenticateToken(token);
        // Se não encontrar o User Autenticado
        if(!authenticatedUser) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        // obter id nos parametros
        const requestedId = req.params.id
        // encontrar todas as partidas do respetivo id
        const matches = await findMatchesById(requestedId)
        console.log(matches)
        return res.status(200).json(matches)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// Get todos os courts da Arena
app.get('/api/allcourts', async (req, res) => {
    try {
         // Aceder ao header: Authorization
        const authHeader = req.headers.authorization;
        // Remove "Bearer" e isola o token
        const token = authHeader
        // Verificar token e obter o utilizador autenticado
        const authenticatedUser = await authenticateToken(token);
        // Se não encontrar o User Autenticado
        if(!authenticatedUser) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        const courts = await findAllCourts()
        console.log(courts)
        return res.status(200).json(courts)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})



// Assumir porta
app.listen(port, () => {
    console.log(`Está na porta http://localhost:${port}`)
})