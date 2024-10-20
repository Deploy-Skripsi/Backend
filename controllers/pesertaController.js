const imagekit = require('../lib/imagekitConfig');
const Peserta = require('../models/peserta');
const path = require('path');

// Register Peserta Magang
const registerPeserta = async (req, res) => {
  const { fullName, gender, instansi, noTlp, alamat, tanggalMulaiMagang, tanggalSelesaiMagang } = req.body;
  const suratPengantarMagang = req.file;

  try {
    // Upload file ke ImageKit
    let fileUrl = '';
    if (suratPengantarMagang) {
      const result = await imagekit.upload({
        file: suratPengantarMagang.buffer, // Buffer file
        fileName: `${Date.now()}${path.extname(suratPengantarMagang.originalname)}`, // Nama file
        folder: 'surat_pengantar_magang' // Nama folder di ImageKit
      });
      fileUrl = result.url;
    }

    // Cek apakah peserta sudah ada
    let peserta = await Peserta.findOne({ fullName, instansi });
    if (peserta) {
      return res.status(400).json({ msg: 'Peserta already exists' });
    }

    // Buat objek peserta baru
    peserta = new Peserta({
      fullName,
      gender,
      instansi,
      noTlp,
      alamat,
      tanggalMulaiMagang,
      tanggalSelesaiMagang,
      suratPengantarMagang: fileUrl,
    });

    // Simpan peserta ke database
    await peserta.save();

    res.json({ msg: 'Peserta registered successfully', peserta });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
//Get all peserta
const getAllPeserta = async (req, res) => {
  try {
    const peserta = await Peserta.find();
    res.json(peserta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
module.exports = {
  registerPeserta,
  getAllPeserta
}