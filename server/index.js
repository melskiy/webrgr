const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 4000;

// Подключение к MongoDB
const uri = "mongodb+srv://cfif5665:OMJ9CaMHV6wa2fKR@cluster0.d8cqo4s.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(cors());

const db = mongoose.connection;

app.get('/collection/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const products = await db.collection(collectionName).find().toArray();
    console.log(products)
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).send('Коллекция не найдена или в ней нет продуктов');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Запуск сервера
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is Successfully Running, and App is listening on port " + port);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});