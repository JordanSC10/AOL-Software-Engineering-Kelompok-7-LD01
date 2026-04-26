const Equipment = require('../models/Equipment');

// ✅ CREATE
exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    await equipment.save();
    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL (buat Home)
exports.getEquipments = async (req, res) => {
  try {
    const data = await Equipment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET BY ID (buat Detail page)
exports.getEquipment = async (req, res) => {
  try {
    const data = await Equipment.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
exports.updateEquipment = async (req, res) => {
  try {
    const data = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
exports.deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};