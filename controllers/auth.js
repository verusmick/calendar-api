const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `User already created with this mail ${email}`
            });
        }
        user = new User(req.body);
        // hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the admin'
        });
    }
}

const userLogin = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `The user not exist with this email`
            });
        }

        // Confirm Passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: `Error in password`
            });
        }
        // Generate json web token

        res.json({
            ok: true,
            uid: user.id,
            name: user.name

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the admin'
        });
    }
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