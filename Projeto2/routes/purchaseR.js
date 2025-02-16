const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase');
const TicketType = require('../models/ticketType');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { idTicketType, quantity } = req.body;
    
    const ticketType = await TicketType.findByPk(idTicketType);
    if (!ticketType) {
      return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    }
    
    if (TicketType.availableQuantity < quantity) {
      return res.status(400).json({ erro: 'Quantidade solicitada excede o estoque disponível' });
    }
    
    TicketType.availableQuantity -= quantity;
    await TicketType.save();
    
    const Purchase = await Purchase.create({
      quantity,
      ticketTypeId: TicketType.id,
      userId: req.user.id
    });
    
    res.json(Purchase);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/meus', verifyToken, async (req, res) => {
  try {
    const Purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: TicketType
    });
    res.json(Purchases);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const Purchase = await Purchase.findByPk(req.params.id, { include: TicketType });
    if (!Purchase || Purchase.userId !== req.user.id) {
      return res.status(404).json({ erro: 'Purchase não encontrada ou não autorizada' });
    }
    res.json(Purchase);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;
