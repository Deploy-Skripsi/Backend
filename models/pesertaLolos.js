const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PesertaLolosSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  instansi: {
    type: String,
    required: true,
    trim: true,
  },
  divisi: {
    type: String,
    required: true,
    enum: ['IKP', 'APTIKA', 'STATISTIK'], // Pilihan divisi
  },
}, {
  timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
});

module.exports = mongoose.model('PesertaLolos', PesertaLolosSchema);
