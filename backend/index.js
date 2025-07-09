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

const { createUser, readUser } = require('./services/user')



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

    return res.status(200).json({ message: "Utilizador criado", _id: result._id });
})



app.post('/api/auth/login', async (req, res) => {
  const result = await readUser(req.body);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(200).json({ message: "Logged in", token: result.token });
});




// Assumir porta
app.listen(port, () => {
    console.log(`Está na porta http://localhost:${port}`)
})