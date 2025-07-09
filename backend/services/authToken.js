const { findUser } = require('../data/user')

async function authenticateToken (req, res) {
    const authHeader = req.headers['authorization']; // aceder ao header: Authorization
    const token = authHeader?.split(' ')[1]; // Remove "Bearer" e isola o token
    // Verificar se token foi recebido
    if (!token) { 
        return res.status(401).json({"message": "Token not sent"})
    }
    // Verificar se existe sessão com o token recebido
    if (!tokensArr.includes(token)) {
        return res.status(403).json({"message": "There isn't a session with the Token!"})
    }
    // Verificar se token é válido
    if (!ObjectId.isValid(token)) {
        return res.status(400).json({ "message": "Invalid Token!" });
    }
    // Procurar o utilizador com base no token (que é o _id)
    const user = await findUser({ _id: new ObjectId(token) });
    if (!user) {
        return res.status(404).json({ "message": "User not found." });
    }

    return user
}

module.exports = { authenticateToken }
