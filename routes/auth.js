/**
     USers Routes   /auth
     host + /api/auth 
 */

const { Router } = require('express');
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const router = Router();

router.post('/new', createUser);

router.post('/', userLogin);

router.get('/renew', revalidateToken);

module.exports = router;