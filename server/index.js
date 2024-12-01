const express = require('express');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');
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

app.delete('/collection/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    await db.collection(collectionName).drop();
    res.send(`Коллекция ${collectionName} успешно удалена`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/collection/:collectionName/:id', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const id = new mongoose.Types.ObjectId(req.params.id);
    const updateData = req.body;

    const result = await db.collection(collectionName).updateOne({ _id: id }, { $set: updateData });
    if (result.modifiedCount > 0) {
      res.send(`Документ с ID ${req.params.id} успешно обновлен`);
    } else {
      res.status(404).send('Документ не найден');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/collection/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const newDocument = req.body;

    const result = await db.collection(collectionName).insertOne(newDocument);
    res.status(201).send(`Документ успешно добавлен с ID ${result.insertedId}`);
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

// Эндпоинт для удаления карточки
app.delete('/cards/:url', (req, res) => {
  const cardUrl = req.params.url;

  fs.readFile(path.join(__dirname, 'src/entities/cards/cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка чтения файла' });
    }

    let cards = JSON.parse(data);
    cards = cards.filter(card => card.url !== cardUrl);

    fs.writeFile(path.join(__dirname, 'src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно удалена' });
    });
  });
});

// Эндпоинт для редактирования карточки
app.put('/cards/:url', (req, res) => {
  const cardUrl = req.params.url;
  const { name, newUrl, img } = req.body;

  fs.readFile(path.join(__dirname, 'src/entities/cards/cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка чтения файла' });
    }

    let cards = JSON.parse(data);
    const cardIndex = cards.findIndex(card => card.url === cardUrl);

    if (cardIndex === -1) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    cards[cardIndex] = {
      img: img || cards[cardIndex].img,
      name: name || cards[cardIndex].name,
      url: newUrl || cardUrl,
    };

    fs.writeFile(path.join(__dirname, 'src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно обновлена' });
    });
  });
});
// Запуск сервера
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is Successfully Running, and App is listening on port " + port);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});