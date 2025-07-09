const { findUser } = require('../data/user')

async function authenticateToken (req, res) {
    const authHeader = req.headers['authorization']; // aceder ao header: Authorization
    const token = authHeader?.split(' ')[1]; // Remove "Bearer" e isola o token
    // Verificar se token foi recebido
    if (!token) { 
        return res.status(401).json({"message": "Não foi enviado o token de autenticação."})
    }
    // Verificar se existe sessão com o token recebido
    if (!tokensArr.includes(token)) {
        return res.status(403).json({"message": "Não existe nenhuma sessão com o token indicado!"})
    }
    // Verificar se token é válido
    if (!ObjectId.isValid(token)) {
        return res.status(400).json({ "message": "Token inválido!" });
    }
    // Procurar o utilizador com base no token (que é o _id)
    const user = await findUser({ _id: new ObjectId(token) });
    if (!user) {
        return res.status(404).json({ "message": "Utilizador não encontrado na base de dados!" });
    }

    const requestedId = req.params.id

    const sameUser = user._id.toString() === requestedId

    return res.status(200).json({ sameUser })
}

module.exports = { authenticateToken }
