const Equipment = require('../models/equipment');

// CREATE
exports.createEquipment = async (req, res) => {
  try {
    const ownerId = req.body.ownerId || req.body.userId || null;

    const equipment = new Equipment({
      ...req.body,
      ownerId,
      image: req.file ? req.file.filename : null
    });

    await equipment.save();

    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL (SEARCH + FILTER + OWNER DATA)
exports.getEquipments = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    // SEARCH
    if (search) {
      query.name = {
        $regex: search,
        $options: 'i'
      };
    }

    // FILTER CATEGORY
    if (category) {
      query.category = category;
    }

    const data = await Equipment.find(query)
      .populate(
        'ownerId',
        'name whatsapp bankName accountNumber accountHolder ownerQR'
      );

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// GET BY ID (DETAIL + OWNER DATA)
exports.getEquipment = async (req, res) => {
  try {
    const data = await Equipment.findById(req.params.id)
      .populate(
        'ownerId',
        'name whatsapp bankName accountNumber accountHolder ownerQR'
      );

    if (!data) {
      return res.status(404).json({
        msg: 'Equipment not found'
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// UPDATE
exports.updateEquipment = async (req, res) => {
  try {
    const data = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    ).populate(
      'ownerId',
      'name whatsapp bankName accountNumber accountHolder ownerQR'
    );

    if (!data) {
      return res.status(404).json({
        msg: 'Equipment not found'
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// DELETE
exports.deleteEquipment = async (req, res) => {
  try {
    const data = await Equipment.findByIdAndDelete(
      req.params.id
    );

    if (!data) {
      return res.status(404).json({
        msg: 'Equipment not found'
      });
    }

    res.json({
      msg: 'Deleted'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
