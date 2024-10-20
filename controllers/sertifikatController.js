const Sertifikat = require('../models/sertifikat'); // Sesuaikan dengan path model Anda

// Controller untuk membuat Sertifikat
const createSertifikat = async (req, res) => {
  const { fullName, instansi } = req.body;

  try {
    // Buat objek Sertifikat baru
    const sertifikat = new Sertifikat({
      fullName,
      instansi,

    });

    // Simpan Sertifikat ke database
    await sertifikat.save();

    res.status(201).json({ msg: 'Sertifikat created successfully', sertifikat });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller untuk mendapatkan semua Sertifikat
const getAllSertifikat = async (req, res) => {
  try {
    const sertifikats = await Sertifikat.find(); // Mengambil semua Sertifikat dari database

    if (!sertifikats.length) {
      return res.status(404).json({ msg: 'No Sertifikat found' });
    }

    res.status(200).json(sertifikats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteSertifikat = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL
  try {
    const sertifikat = await Sertifikat.findByIdAndDelete(id); // Menghapus sertifikat berdasarkan ID
    if (!sertifikat) {
      return res.status(404).json({ message: 'Sertifikat not found' }); // Jika tidak ada sertifikat dengan ID tersebut
    }
    return res.status(200).json({ message: 'Sertifikat deleted successfully' }); // Mengembalikan pesan sukses
  } catch (error) {
    console.error('Error deleting sertifikat:', error);
    return res.status(500).json({ message: 'Error deleting sertifikat' }); // Menangani error server
  }
};


module.exports = {
  createSertifikat,
  getAllSertifikat,
  deleteSertifikat
};
