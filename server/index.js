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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.join(__dirname, '../front/src/widget/categories/images');
    fs.mkdirSync(destPath, { recursive: true });
    cb(null, destPath); // Папка для сохранения изображений
  },
  filename: (req, file, cb) => {
    // Указываем оригинальное имя файла для сохранения
    cb(null, file.originalname);
  },
});

// Создаем middleware для обработки загрузки файлов
const upload = multer({ storage });

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

app.delete('/collection/:collectionName/:id', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const id = req.params.id;
    item = await db.collection(collectionName).deleteOne({ _id: Number(id)});
    console.log(item)
    res.send(`Запись с id ${id} из коллекции ${collectionName} успешно удалена`);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});


app.put('/collection/:collectionName/:id', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const id = req.params.id;
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
    console.log('user не найден ');
    return res.status(400).send('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log('пароль не подходит');
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// const seedUser = async () => {
//   try {
//     // Удаление существующего пользователя с тем же логином
//     await User.deleteOne({ username: '274161854' });

//     // Создание нового пользователя
//     const username = '274161854';
//     const password = '274161854';

//     // Хешируем пароль
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Создаем нового пользователя с хешированным паролем
//     const user = new User({
//       username: username,
//       password: hashedPassword, // Сохраняем хешированный пароль
//     });

//     await user.save();
//     console.log('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     mongoose.connection.close(); // Закрываем соединение с базой данных
//   }
// };

// seedUser();

// Эндпоинт для удаления карточки
app.delete('/cards/:url', (req, res) => {
  const cardUrl = req.params.url;

  fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка чтения файла' });
    }

    let cards = JSON.parse(data);
    cards = cards.filter(card => card.url !== cardUrl);

    fs.writeFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно удалена' });
    });
  });
});

// Эндпоинт для редактирования карточки
app.put('/cards/:url', upload.single('image'), (req, res) => {
  const cardUrl = req.params.url;
  const { name, newUrl, imagename } = req.body;

  fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
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
      img: `src/widget/categories/images/${imagename}` || cards[cardIndex].img,
      name: name || cards[cardIndex].name,
      url: newUrl || cardUrl,
    };
    console.log(cards[cardIndex])
    fs.writeFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно обновлена' });
    });
  });
});

// Эндпоинт для загрузки изображений и обновления cards.json
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    const { name, url } = req.body;
    const newCard = {
      img: `src/widget/categories/images/${url}`,
      name : name,
      url: url.split('.').slice(0, -1).join('.'),
    };

    fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка чтения файла' });
      }

      const cards = JSON.parse(data);
      cards.push(newCard);

      fs.writeFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Ошибка записи файла' });
        }

        res.status(200).json({ message: 'Карточка успешно добавлена' });
      });
    });
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    res.status(500).json({ message: 'Ошибка при загрузке изображения' });
  }
});

// Запуск сервера
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is Successfully Running, and App is listening on port " + port);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});