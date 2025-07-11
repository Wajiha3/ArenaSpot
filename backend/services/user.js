const { insertUser, findUser, updateUser, deleteUser } = require('../data/user')

const { addToken } = require('./authToken');


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


async function createUser (data) {

    const { userName, password, passwordConfirmation, email , position, firstName, lastName, birthDate } = data


    // confirmação se email já existe
    const user = await findUser({email})
    if (user && email === user.email) {
       return {message: errors.message, error: errors.errors.email}
    }

    // confirmação se email já existe
    const playerName = await findUser({userName})
    // confirmação se username já existe
    if (playerName && userName === playerName.userName) {
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

    let gamesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let points = 0;
    let paymentToken = false;
    let level = "Beginner";
    
    // Não enviar a confirmação para a DB
    const userData = { userName, password, email , position, firstName, lastName, birthDate, gamesPlayed, wins, losses, points, paymentToken, level }

    // se passar todas as confirmações, executa a função
    const id = await insertUser(userData);

    return id;
}


async function loginUser (data) {

    const { email, password } = data
    // erro se email não for encontrado
    console.log("Attempting to login with email:", email)
    const user = await findUser({email})
    console.log("User found:", user)
    if (!user) {
        return "Email not found!"
    }
    // erro se password não der match
    if (user.password !== password) {
        return "Invalid password!"
    }
    // atribuir token como o id gerado
    const token = user._id.toString() 
    // Adicionar token ao Array de Tokens através da função
    addToken(token)
    // Retorno de sucesso com um token
    return token ;
}


async function checkInUser({userId}) {
    const user = await findUser({_id: userId})
    if (!user) {
        throw new Error("User not found");
    }
    // Atualiza paymentToken para true
    const updateResult = await updateUser({ _id: userId }, { paymentToken: true });

    return updateResult
}

module.exports = { createUser, loginUser, checkInUser }