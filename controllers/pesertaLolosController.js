const PesertaLolos = require('../models/pesertaLolos');

// Create Data PesertaLolos
const createPesertaLolos = async (req, res) => {
  const { fullName, instansi, divisi } = req.body;

  try {
    // Cek apakah peserta sudah ada
    let pesertaLolos = await PesertaLolos.findOne({ fullName, instansi });
    if (pesertaLolos) {
      return res.status(400).json({ msg: 'Peserta already exists' });
    }

    // Buat objek pesertaLolos baru
    pesertaLolos = new PesertaLolos({
      fullName,
      instansi,
      divisi,
    });

    // Simpan pesertaLolos ke database
    await pesertaLolos.save();

    res.json({ msg: 'PesertaLolos created successfully', pesertaLolos });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Edit Data PesertaLolos
const editPesertaLolos = async (req, res) => {
  const { id } = req.params; // Ambil ID dari params
  const { fullName, instansi, divisi } = req.body;

  try {
    // Cari pesertaLolos berdasarkan ID dan perbarui
    const pesertaLolos = await PesertaLolos.findByIdAndUpdate(
      id,
      { fullName, instansi, divisi },
      { new: true }
    );

    if (!pesertaLolos) {
      return res.status(404).json({ msg: 'PesertaLolos not found' });
    }

    res.json({ msg: 'PesertaLolos updated successfully', pesertaLolos });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Get All Data PesertaLolos
const getAllPesertaLolos = async (req, res) => {
  try {
    const pesertaLolosList = await PesertaLolos.find(); // Mendapatkan semua pesertaLolos
    res.json(pesertaLolosList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Delete PesertaLolos by Id
const deletePesertaLolos = async (req,res)=>{
  try {
    const { id } = req.params;
    const pesertaLolos = await PesertaLolos.findByIdAndDelete(id);
    
    if (!pesertaLolos) {
      return res.status(404).json({ message: 'PesertaLolos not found' });
    }
    
    res.status(200).json({ message: 'PesertaLolos deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = {
  createPesertaLolos,
  editPesertaLolos,
  getAllPesertaLolos,
  deletePesertaLolos
};
