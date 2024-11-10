const Auth=require('../models/auth')
const jwt=require('jsonwebtoken')

const userAuthentication = async (req, res, next) => {
    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization');
            const data = jwt.verify(token, 'wuCCWAcqs7yGQm82QhuXTJep6hRqMUdZQfqSFaVSZHwY3I5kHLpRqWRtFdRKDqJ');
            const user = await Auth.findByPk(data.userId);
               console.log(token)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            req.user = user;  // Attach user to request object
            console.log("Authenticated user:", user);
            return next();  // Continue to the next middleware/handler only after successful authentication
        } else {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
    } catch (error) {
        console.error("Authentication error:", error.message);
        //return res.status(500).json({ error: 'Server error during authentication' });
    }
};

module.exports={userAuthentication}