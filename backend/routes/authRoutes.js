const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authController');
const { uploadCsv, getCsvData, updateRow, exportCsv } = require('../controllers/csvController');
const multer = require('multer');
const authenticateUser = require('../middlewares/authenticateUser');

const upload = multer({ dest: 'uploads/' });

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/upload', authenticateUser, upload.single('file'), uploadCsv);
router.get('/data', authenticateUser, getCsvData);
router.post('/update', authenticateUser, updateRow);
router.get('/export', authenticateUser, exportCsv);

module.exports = router;
