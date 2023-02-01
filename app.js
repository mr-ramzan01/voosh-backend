const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const orderRouter = require('./routers/orderRouter');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.send("In home");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

app.use('/users', userRouter);
app.use('/orders', orderRouter);


app.get('*', (req, res) => {
  res.status(400).send("Invalid request");
})

module.exports = app;