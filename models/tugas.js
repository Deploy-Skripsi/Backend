const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const tugasSchema = new Schema({
  namaTugas: {
    type: String,
    required: true,
    trim: true,
  },
  deskripsi: {
    type: String,
    required: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
    trim: true, // Menyimpan path atau URL ke file tugas
  },
}, {
  timestamps: true,
});

// tugasSchema.plugin(autoIncrement, { inc_field: 'tugasId', start_seq: 2 });

const Tugas = mongoose.model('Tugas', tugasSchema);

module.exports = Tugas;
