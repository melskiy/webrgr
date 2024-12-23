// Импортируем необходимые модули
const express = require('express'); // Веб-фреймворк для Node.js
const multer = require('multer'); // Middleware для обработки multipart/form-data (загрузка файлов)
const path = require('path'); // Модуль для работы с путями файлов
const fs = require('fs'); // Модуль для работы с файловой системой
const mongoose = require('mongoose'); // ODM для работы с MongoDB
const bcrypt = require('bcrypt'); // Библиотека для хеширования паролей
const jwt = require('jsonwebtoken'); // Библиотека для работы с JWT токенами
const cors = require('cors'); // Middleware для настройки CORS

// Создаем экземпляр приложения Express
const app = express();
const port = 4000;

// Подключение к MongoDB
const uri = "mongodb+srv://cfif5665:OMJ9CaMHV6wa2fKR@cluster0.d8cqo4s.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware для парсинга JSON в теле запроса
app.use(express.json());

// Определяем схему пользователя для MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Создаем модель пользователя
const User = mongoose.model('User', userSchema);

// Включаем CORS
app.use(cors());

// Получаем объект подключения к базе данных
const db = mongoose.connection;

// Настраиваем хранилище для загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Определяем путь для сохранения файлов
    const destPath = path.join(__dirname, '../front/src/widget/categories/images');
    // Создаем директорию, если она не существует
    fs.mkdirSync(destPath, { recursive: true });
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    // Сохраняем файл с оригинальным именем
    cb(null, file.originalname);
  },
});

// Создаем middleware для обработки загрузки файлов
const upload = multer({ storage });

// GET запрос для получения всех документов из коллекции
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

// DELETE запрос для удаления документа по ID
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

// PUT запрос для обновления документа
app.put('/collection/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const { name, ...updateData } = req.body;

    const result = await db.collection(collectionName).updateOne(
      { name: name }, 
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      res.send(`Документ с именем ${name} успешно обновлен`);
    } else {
      res.status(404).send('Документ не найден');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST запрос для создания нового документа
app.post('/collection/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const newDocument = req.body;

    // Находим последний документ для определения следующего ID
    const lastDocument = await db.collection(collectionName)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    // Устанавливаем новый ID
    newDocument._id = lastDocument.length > 0 ? lastDocument[0]._id + 1 : 1;

    const result = await db.collection(collectionName).insertOne(newDocument);
    res.status(201).send(`Документ успешно добавлен с ID ${newDocument._id}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST запрос для авторизации пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    console.log('user не найден ');
    return res.status(400).send('User not found');
  }

  // Проверяем пароль
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log('пароль не подходит');
    return res.status(400).send('Invalid password');
  }

  // Создаем JWT токен
  const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Закомментированный код для создания тестового пользователя
// const seedUser = async () => {
//   try {
//     await User.deleteOne({ username: '274161854' });
//     const username = '274161854';
//     const password = '274161854';
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({
//       username: username,
//       password: hashedPassword,
//     });
//     await user.save();
//     console.log('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };
// seedUser();

// DELETE запрос для удаления карточки
app.delete('/cards/:url', (req, res) => {
  const cardUrl = req.params.url;

  // Читаем файл с карточками
  fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка чтения файла' });
    }

    // Фильтруем карточки
    let cards = JSON.parse(data);
    cards = cards.filter(card => card.url !== cardUrl);

    // Записываем обновленный список карточек
    fs.writeFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно удалена' });
    });
  });
});

// PUT запрос для редактирования карточки
app.put('/cards/:url', upload.single('image'), (req, res) => {
  const cardUrl = req.params.url;
  const { name, newUrl, imagename } = req.body;

  // Читаем файл с карточками
  fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ошибка чтения файла' });
    }

    // Находим и обновляем карточку
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

    // Записываем обновленный список карточек
    fs.writeFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка записи файла' });
      }

      res.status(200).json({ message: 'Карточка успешно обновлена' });
    });
  });
});

// POST запрос для загрузки изображений и создания новой карточки
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

    // Читаем существующие карточки
    fs.readFile(path.join(__dirname, '../front/src/entities/cards/cards.json'), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ошибка чтения файла' });
      }

      // Добавляем новую карточку
      const cards = JSON.parse(data);
      cards.push(newCard);

      // Записываем обновленный список карточек
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

// Запускаем сервер
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is Successfully Running, and App is listening on port " + port);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});