const { response } = require('express');

const createUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Registro'
    })
}

const userLogin = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}



module.exports = {
    createUser,
    userLogin,
    revalidateToken
}