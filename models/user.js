const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Number, // ID sebagai tipe Number
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
}, {
  timestamps: true, // Menambahkan createdAt dan updatedAt
});

userSchema.plugin(autoIncrement, { inc_field: '_id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
