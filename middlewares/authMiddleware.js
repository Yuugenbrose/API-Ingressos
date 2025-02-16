const jwt = require('jsonwebtoken');
const secret = 'seu_seguro_jwt';

function verifyToken(req, res, next) {
  const headerAuth = req.headers['authorization'];
  const token = headerAuth && headerAuth.split(' ')[1];
  
  if (!token) return res.status(401).json({ erro: 'Token não informado' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ erro: 'Falha na autenticação do token' });
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
