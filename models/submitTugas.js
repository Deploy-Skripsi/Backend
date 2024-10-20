const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmitTugasSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  keterangan: {
    type: String,
    required: true,
    trim: true,
  },
  fileTugas: {
    type: String,
    required: true,
    trim: true, // Menyimpan path atau URL ke file tugas
  },
}, {
  timestamps: true, // Menambahkan createdAt dan updatedAt secara otomatis
});

module.exports = mongoose.model('SubmitTugas', SubmitTugasSchema);
