const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Bearer scheme

    if (!token) {
        return res.status(401).json({ message: 'No token provided, please log in.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.userId = decoded.id; // Set user ID for further use
        next();
    });
};

module.exports = authenticate;
