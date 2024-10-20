const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PesertaSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Laki-laki', 'Perempuan'], // Anda bisa menyesuaikan pilihan ini
  },
  instansi: {
    type: String,
    required: true,
    trim: true,
  },
  noTlp: {
    type: String,
    required: true,
    trim: true,
  },
  alamat: {
    type: String,
    required: true,
    trim: true,
  },
  tanggalMulaiMagang: {
    type: Date,
    required: true,
  },
  tanggalSelesaiMagang: {
    type: Date,
    required: true,
  },
  suratPengantarMagang: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
});

module.exports = mongoose.model('Peserta', PesertaSchema);
