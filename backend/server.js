const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:21721/music-app', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

const Song = mongoose.model('Song', new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
}));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, 'secretkey');
  res.json({ token });
});

app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

app.listen(5000, () => console.log('Server running on port 5000'));
