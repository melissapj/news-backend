const fetchUsers = require('../models/users.models')

const getUsers = (req, res) => {
    fetchUsers()
    .then((users) => {
        res.status(200);
        res.send( {users} )
    })
}

module.exports = getUsers