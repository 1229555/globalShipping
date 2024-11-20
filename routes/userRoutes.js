const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, (req, res) => {
    // Return user profile
    res.status(200).json({ userId: req.userId });
});

module.exports = router;

