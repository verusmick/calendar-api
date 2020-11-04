/**
 USers Routes   /auth
 host + /api/auth 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');


router.post(
    '/new',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);

router.post('/',
    [//middlewares        
        check('email', 'Email is required').isEmail(),
        check('password', 'Password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    userLogin);

router.get('/renew', revalidateToken);

module.exports = router;