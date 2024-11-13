const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
    // Create a new JWT token for login session management or authorization
    return jwt.sign(userData, process.env.PRIVATE_KEY);
};

const validateToken = (req, res, next) => {
    // Check if JWT token is available
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    // Extract the token from the "Bearer <token>" format
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        // Verify the token and attach the decoded data to req.user
        const validatedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = validatedToken; // Attach the decoded token data to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token validation failed:", error);
        return res.status(401).json({ err: 'Invalid token' });
    }
};

module.exports = { generateToken, validateToken };
