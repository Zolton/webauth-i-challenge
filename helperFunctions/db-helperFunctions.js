const db = require("../db-Config")

module.exports = {getAll}

function getAll (req, res) {
    return res.status(200).json({Hello: "From db helper funtions"})
}