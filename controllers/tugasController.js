const imagekit = require('../lib/imagekitConfig');
const Tugas = require('../models/tugas');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const path = require('path');

// Create New Tugas
const createTugas = async (req, res) => {
  const { namaTugas, deskripsi } = req.body;
  const file = req.file;

  try {
    // Upload file ke ImageKit
    let fileUrl = '';
    if (file) {
      const result = await imagekit.upload({
        file: file.buffer, // Buffer file
        fileName: `${Date.now()}${path.extname(file.originalname)}`, // Nama file
        folder: 'task' // Nama folder di ImageKit
      });
      fileUrl = result.url;
    }

    // Buat objek tugas baru
    const tugas = new Tugas({
      namaTugas,
      deskripsi,
      file: fileUrl,
    });

    // Simpan tugas ke database
    await tugas.save();

    res.json({ msg: 'Tugas created successfully', tugas });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Get all tugas
const getAllTugas = async (req, res) => {
  try {
    const tugasList = await Tugas.find();
    res.status(httpStatus.OK).json(tugasList);
  } catch (error) {
    console.error(error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Server error');
  }
};
// Update Tugas
const updateTugas = async (req, res) => {
  const { _id } = req.params; // Menggunakan _id sebagai parameter
  const { namaTugas, deskripsi, file } = req.body;

  try {
    // Cari tugas berdasarkan _id
    let tugas = await Tugas.findById(_id);
    if (!tugas) {
      return res.status(404).json({ msg: 'Tugas not found' });
    }

    // Update tugas
    tugas.namaTugas = namaTugas || tugas.namaTugas;
    tugas.deskripsi = deskripsi || tugas.deskripsi;
    tugas.file = file || tugas.file;

    // Simpan perubahan
    await tugas.save();

    res.json({ msg: 'Tugas updated successfully', tugas });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Tugas by Id
const deleteTugas = async (req, res) => {
  const { _id } = req.params; // Menggunakan _id sebagai parameter

  try {
    // Cari tugas berdasarkan _id dan hapus
    const result = await Tugas.deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Tugas not found' });
    }

    res.json({ msg: 'Tugas deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createTugas,
  updateTugas,
  getAllTugas,
  deleteTugas
};
