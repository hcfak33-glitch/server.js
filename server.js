const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS এনাবল করা যাতে ফ্রন্টএন্ড থেকে রিকোয়েস্ট আসতে পারে
app.use(cors());
app.use(express.json());

// ইমেজ আপলোড করার জন্য ফোল্ডার সেটআপ
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// টেস্ট রুট
app.get('/', (req, res) => {
  res.send('AI Tool Backend is Running!');
});

// ইমেজ আপলোড রুট
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('কোনো ফাইল আপলোড করা হয়নি।');
  }
  
  // এখানে আপনি পরে AI প্রসেসিং কোড যুক্ত করতে পারবেন
  res.json({
    message: 'ফটো সফলভাবে ব্যাকএন্ডে পৌঁছেছে!',
    filename: req.file.filename
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
