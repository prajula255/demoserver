const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    console.log("inside verifytoken");
    console.log(req.header);

    try {
        const token = req.header("Authorization"); // Get token from headers
        console.log(token);

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified);

        req.user = verified; // Add user data to request

        next(); // Move to next middleware/route
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};
