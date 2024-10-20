require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const sessionMiddleware = require('./config/session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Router
const accesRoutes = require('./routers/access')
const userRoutes = require('./routers/user');
const pesertaRoutes = require('./routers/peserta');
const pesertaLolosRoutes = require('./routers/pesertaLolos');
const tugasRoutes = require('./routers/tugas');
const submitTugasRoutes = require('./routers/submitTugas');
const sertifikatRoutes = require('./routers/sertifikat');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials (cookies) to be sent
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Gunakan middleware session
app.use(sessionMiddleware);

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/api', accesRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/peserta', pesertaRoutes);
app.use('/api/v1/peserta-lolos', pesertaLolosRoutes);
app.use('/api/v1/tugas', tugasRoutes);
app.use('/api/v1/submit-tugas', submitTugasRoutes);
app.use('/api/v1/sertifikat', sertifikatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
