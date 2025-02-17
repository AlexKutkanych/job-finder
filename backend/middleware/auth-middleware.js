const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req?.cookies?.jwt;

  if (!token) {
    return res.status(403).json({ message: 'Token not present!' });
  }

  jwt.verify(token, 'super secret string', (error, decodedToken) => {
    if (error) {
      console.log(error, 'Incorrect login');
      return res.status(403).json({ message: 'Incorrect token!' });
    }

    console.log(decodedToken, 'token');
    req.userId = decodedToken?.id;
    next();
  });
};

module.exports = { requireAuth };
