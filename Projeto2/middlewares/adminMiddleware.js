function isAdmin(req, res, next) {
    if (req.user && req.user.paper === 'admin') {
      return next();
    }
    return res.status(403).json({ erro: 'Permissão de administrador necessária' });
  }
  
  module.exports = { isAdmin };
  