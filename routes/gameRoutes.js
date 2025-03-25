// routes/gameRoutes.js
const express = require('express');
const gameController = require('../controllers/gameController'); // Ensure this is correct

const router = express.Router();

router.get('/', gameController.getAllGames);  // Ensure gameController.getAllGames exists
router.get('/:id', gameController.getGameById); // Ensure gameController.getGameById exists
router.post('/', gameController.create);       // Ensure gameController.create exists
router.put('/:id', gameController.update);     // Ensure gameController.update exists
router.delete('/:id', gameController.delete);  // Ensure gameController.delete exists

module.exports = router;
