const { updateUser } = require("../data/user");




function dailyKey (data) {

    const matrix = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ["!", "@", "#", "$", "%", "&", "/", "(", ")", "=", "?", "."]
]


    const { hasLowerCase, hasUpperCase, hasNumbers, hasSpecialCharacters } = data;

    const length = 6

    let dailyKey = ""

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            dailyKey += matrix[i][j]
        }
    }

    updateUser(data);
}