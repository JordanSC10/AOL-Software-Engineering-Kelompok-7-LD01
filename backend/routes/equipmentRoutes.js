const express = require('express');
const router = express.Router();

const equipmentController = require('../controllers/equipmentController');
const upload = require('../middleware/upload');

// CREATE
router.post('/', upload.single('image'), equipmentController.createEquipment);

// GET ALL
router.get('/', equipmentController.getEquipments);

// GET BY ID
router.get('/:id', equipmentController.getEquipment);

// UPDATE
router.put('/:id', equipmentController.updateEquipment);

// DELETE
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;