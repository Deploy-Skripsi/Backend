const imagekit = require('../lib/imagekitConfig');
const SubmitTugas = require('../models/submitTugas');
const httpStatus = require('http-status');
const path = require('path');

// Submit Tugas
const createSubmitTugas = async (req, res) => {
    const { fullName, email, keterangan } = req.body;
    const fileTugas = req.file;
  
    try {
        //upload file tugas ke imagekit
        let fileUrl = '';
        if (fileTugas) {
          const result = await imagekit.upload({
            file: fileTugas.buffer, // Buffer file
            fileName: `${Date.now()}${path.extname(fileTugas.originalname)}`, // Nama file
            folder: 'tugas_peserta' // Nama folder di ImageKit
          });
          fileUrl = result.url;
        }
      // Create new submission
      const newSubmitTugas = new SubmitTugas({
        fullName,
        email,
        keterangan,
        fileTugas :fileUrl,
      });
  
      // Save ke database
      await newSubmitTugas.save();
  
      res.status(httpStatus.CREATED).json({ message: 'Submission created successfully', submitTugas: newSubmitTugas });
    } catch (error) {
      console.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  };
// Get All Tugas Submitted
const getAllTugas = async (req, res) => {
    try {
      // Mengambil semua tugas dari database
      const tugasList = await SubmitTugas.find();
      
      res.status(httpStatus.OK).json(tugasList);
    } catch (error) {
      console.error(error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  };

  const deleteSubmission = async (req, res) => {
    const { id } = req.params; // Ambil id dari parameter
  
    try {
      // Cari submission berdasarkan ID dan hapus
      const submission = await SubmitTugas.findByIdAndDelete(id);
      
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      // Kirim respon sukses
      res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ message: 'Error deleting submission' });
    }
  };
  

module.exports = {
    createSubmitTugas,
    getAllTugas,
    deleteSubmission
}