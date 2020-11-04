const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: `There isn't token in the require`
        });
    }
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        })
    }

    // console.log(token)
    next();
}

module.exports = {
    jwtValidator
}