const express = require('express');
const router = express.Router();
const TicketType = require('../models/ticketType');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');

router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, price, availableQuantity } = req.body;
    const ticketType = await TicketType.create({ name, price, availableQuantity });
    res.json(ticketType);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const ticketType = await TicketType.findAll();
    res.json(ticketType);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticketType = await TicketType.findByPk(req.params.id);
    if (!ticketType) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    res.json(ticketType);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, price, availableQuantity } = req.body;
    const ticketType = await TicketType.findByPk(req.params.id);
    if (!ticketType) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    await TicketType.update({ name, price, availableQuantity });
    res.json(ticketType);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const ticketType = await TicketType.findByPk(req.params.id);
    if (!ticketType) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    await TicketType.destroy();
    res.json({ mensagem: 'Tipo de ingresso excluído' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;
