const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'seu_seguro_jwt';

router.post('/register', async (req, res) => {
  try {
    const { nameUser, password, paper } = req.body;
    const user = await User.create({ nameUser, password, paper });
    res.json(user);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { nameUser, password } = req.body;
    const user = await User.findOne({ where: { nameUser } });
    if (!user || user.password !== password) { 
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id, paper: user.paper }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;