const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");

const editUserMiddleware = async (req, res, next) => {
}

module.exports = { editUserMiddleware };