require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
//const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3000, bd = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
//app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(express.json());
// app.use(cookieParser());
app.use(helmet());

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect(bd)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключение к базе состоялось');

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Приложение работает на порте ${PORT}`);
    });
  })

  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Ошибка подключения к базе', err);

    process.exit();
  });
