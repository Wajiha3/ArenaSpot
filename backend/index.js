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

const { createUser, loginUser } = require('./services/user')
const { authenticateToken } = require('./services/authToken')
const { findUser } = require('./data/user')



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

    return res.status(200).json({ message: "Utilizador criado", _id: result});
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


app.get('/api/user/:id', async (req, res) => {
    try {
        // Verificar token e obter o utilizador autenticado
        const authenticatedUser = await authenticateToken(req);

        const requestedId = req.params.id;

        // Verificar se o utilizador autenticado está a aceder ao próprio perfil
        if (authenticatedUser._id.toString() !== requestedId) {
            return res.status(403).json({ message: "Forbidden Access." });
        }

        // Obter os dados do utilizador
        const userData = await findUser({ _id: new ObjectId(requestedId) });

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        // Remover password antes de retornar
        delete userData.password;

        // Retorna o utilizador sem a password e depois de confirmado que está autenticado
        return res.status(200).json(userData);

        } catch (err) {
        // Erros
        return res.status(500).json({ message: err.message || "Error." });
    }
})



// Assumir porta
app.listen(port, () => {
    console.log(`Está na porta http://localhost:${port}`)
})