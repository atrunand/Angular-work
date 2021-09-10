const mongoose = require('mongoose'); // สร้างตัวแปร mongoose แล้วดึงค่าจาก mongoose(1)
const Schema = mongoose.Schema; //

let Book = new Schema({
  // สร้าง field แล้วกำหนด NAME:{TYPE of data}(2)
  name: {
    type: String
  },
  price: {
    type: String
  },
  descriptios: {
    type: String
  }
},
{
  collection: 'books'
})

module.exports = mongoose.model('Book', Book)
// export modelที่สร้าง(3)
