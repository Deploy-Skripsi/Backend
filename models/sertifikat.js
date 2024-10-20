const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SertifikatSchema = new Schema({
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
  
}, {
  timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
});

module.exports = mongoose.model('Sertifikat', SertifikatSchema);
