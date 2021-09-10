// require ข้อมูลทั้งหมดที่ใช้สร้าง API
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db')

mongoose.Promise = global.Promise; // ใช้Method Promise
mongoose.connect(mongoDb.db, { //ทำการ connect กับ database mongoDB
  useNewUrlParser: true,
  useFindAndmodify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database successfully connected');
}, error => {
  console.log('Database error: ' + error)
})

const bookRoute = require('./routes/book.route')

const app = express();
app.use(bodyParser.json()); //Method use เพื่อเรียกใช้ ค่าที่อยู่ใน()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors());

// กำหนดการเชื่อมต่อกับ database mongoDB
// Static directory path
app.use(express.static(path.join(__dirname, 'dist/'))) // __dirname จะไปหาที่อยู่ของโปรเจคเรา เพื่อไม่ให้มีปัญหาในการเปิดเว็บที่อื่น แล้วไปแสดงผลที่ '/dist'
// Base route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// API Root
app.use('/api', bookRoute); // ถ้ามีการเปิดใช้ api ก็จะให้มันเรียกใช้ bookRoute

// กำหนด PORT
const port = process.env.PORT || 8000 ;

app.listen(port, () => [
  console.log('Listening on port ' + port)
])

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message)
})
