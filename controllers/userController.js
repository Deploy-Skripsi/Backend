const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const commonPasswords = [
  'password',
  '123456',
  '12345678',
];

const validatePassword = (password) => {
  // Panjang minimal 8 karakter
  if (password.length < 5) {
    return 'Password must be at least 5 characters long';
  }

  // Kompleksitas: huruf besar, huruf kecil, angka, dan karakter khusus
  // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // if (!regex.test(password)) {
  //   return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  // }

  // Periksa kata sandi umum
  if (commonPasswords.includes(password.toLowerCase())) {
    return 'Password is too common';
  }

  return null; // Tidak ada kesalahan
};

// Register New User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Cek apakah pengguna sudah ada
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

     // Validasi kata sandi
     const passwordError = validatePassword(password);
     if (passwordError) {
       return res.status(400).json({ msg: passwordError });
     }

    // Buat objek pengguna baru
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Enkripsi password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Simpan pengguna ke database
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Login User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    let user = await User.findOne({ email });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid Email or Password' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        msg: 'Invalid credentials' });
    }

    // Generate JWT dan waktu expired di sisi client
    const payload = {
      _id: user._id,
      role: user.role
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
  
    // Set session
    req.session.userId = user._id; // Sesuaikan dengan ID user dari MongoDB
    req.session.role = user.role; // Simpan role user

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        user: {
          email: user.email,
          role: user.role
        },
        token,
        sessionId: req.session.id
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Edit User
const editUser = async (req, res) => {
  const { _id } = req.params; // Dapatkan ID pengguna dari parameter URL
  const { name, email, password } = req.body; // Dapatkan data yang diubah dari body request

  try {
    // Buat objek update
    let updateData = { name, email };

    // Jika password diubah, enkripsi dan tambahkan ke objek update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Cari pengguna berdasarkan ID dan update data yang diberikan
    const user = await User.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true } 
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Get All User
const getAllUser = async (req,res)=>{
  try {
    // Mengambil semua pengguna dari database
    const users = await User.find().select('-password'); // Menghindari mengirimkan password ke client

    // Mengirimkan pengguna sebagai respons
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Find User By Id
const findUserById = async (req, res) => {
  const { _id } = req.params;

  try {
    // Cari pengguna berdasarkan ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'User found',
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Logout User
const logoutUser = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    console.log('Session destroyed');
    res.clearCookie('connect.sid', { path: '/' });
    console.log('Cookie cleared');
    res.status(200).json({ msg: 'Logout berhasil' });
  } catch (err) {
    console.error('Error during logout:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
// Delete user by Id
const deleteUserById = async (req, res) => {
  const { _id } = req.params;

  try {
    // Cari pengguna berdasarkan ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Cek apakah pengguna yang ingin dihapus adalah admin
    if (user.role === 'Admin') {
      return res.status(403).json({ msg: 'Cannot delete an Admin user' });
    }

    // Hapus pengguna
    await User.findByIdAndDelete(_id);

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
  loginUser,
  editUser,
  findUserById,
  logoutUser,
  getAllUser,
  deleteUserById
};
