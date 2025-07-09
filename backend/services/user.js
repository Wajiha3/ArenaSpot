const { insertUser, findUser, updateUser, deleteUser } = require('../data/user')

// variável de mensagens de erro
const errors = {
    message: "The data is invalid",
    errors: {
        username: "Username already exists",
        email: "Email already exists",
        passwordConfirmation: "Passwords don't match",
        empty: "There is blank spaces"
    }
}

// Criação de array de tokens de sessão
const tokensArr = []

async function createUser (data) {

    const { userName, password, passwordConfirmation, email , position, firstName, lastName, birthDate } = data


    // confirmação se email já existe
    const user = await findUser({email})

    
    if (user && email === user.email) {
       return {message: errors.message, error: errors.errors.email}
    }

    // confirmação se username já existe
    if (user && userName === user.userName) {
       return {message: errors.message, error: errors.errors.username}
    }

    // confirmação se não há campos vazios
    if (email === "" || password === "" || passwordConfirmation === "" || userName === "" || email === "" || firstName === "" || lastName === "" || birthDate === "") {
        return {message: errors.message, error: errors.errors.empty}
    }

    // confirmação se passwords estão iguais
    if (password !== passwordConfirmation) {
        return {"message": errors.message, "error": errors.errors.passwordConfirmation}
    }

    
    // Não enviar a confirmação para a DB
    const userData = { userName, password, email , position, firstName, lastName, birthDate }

    // se passar todas as confirmações, executa a função
    const id = await insertUser(userData);

    return id;
}


async function readUser (data) {

    const { email, password } = data
    // erro se email não for encontrado
    const user = await findUser({email})
    if (!user) {
        return res.status(404).json({"message": "Email not found!"})
    }
    // erro se password não der match
    if (user.password !== password) {
        return res.status(401).json({"message": "Invalid password!"})
    }
    // atribuir token como o id gerado
    const token = user._id.toString() 
    // Adicionar token ao Array de Tokens
    tokensArr.push(token)
    // Retorno de sucesso com um token
    return res.status(200).json({ "token": token })
}


/*gamesPlayed, wins, losses, paymentToken*/

module.exports = { createUser, readUser }