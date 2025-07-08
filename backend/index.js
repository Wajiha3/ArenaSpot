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



// Assumir porta
app.listen(port, () => {
    console.log(`Está na porta http://localhost:${port}`)
})