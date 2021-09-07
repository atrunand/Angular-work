/*
Routes
ทำการกำหนด route
>> ในการทำ REST API เราจะต้องทำการกำหนด route ในการเข้าถึง API ของเรา เช่น เราต้องการเพิ่มหนังสือก็ให้เข้าไปที่ /add-book
*/
const express = require('express');  // require express
const app = express(); //เรียกใช้ express แล้วเก็บไว้ในตัวแปร app

const bookRoute = express.Router(); //require express.Router()
let Book = require('../model/Book'); // require file book

// Add Book
bookRoute.route('/add-book').post((req, res, next) => { //เรียกใช้ตัวแปรbookRoute แล้วใช้Method route กำหนดไปที่ /add-book แล้วใช้Method post ที่มีความหมายว่า เป็นการเพิ่มข้อมูล และรับ parameter มา 3 ตัวคือ req(request), res(response),next
  Book.create(req.body, (error, data) => { //Method create เป็นการเพิ่มข้อมูลเข้าไป แล้วจะรับข้อมูลเป็น req.body และรับข้อมูล errorกับdata เข้ามา เพื่อมาเช็ค error
    if(error) {
      return next(error);
    }else{
      res.json(data)
    }
  })
})

// Get all book
bookRoute.route('/').get((req, res) => { // การใช้'/' หมายถึงการเข้ามาที่หน้าแรก , ใช้ Method get ในการเอาข้อมูลหนังสือทั้งหมดออกมา
  Book.find((error, data) => { // Method find ใช้เพื่อไปหาหนังสือทั้งหมดมา
    if(error) {
      return next(error);
    }else{
      res.json(data)
    }
  })
})

// Get book การเข้าถึงหนังสือแต่ลตัวจะต้องใช้ id
bookRoute.route('/read-book/:id').get((req, res) => {
  Book.findById(req.params.id, (error, data) => { // Method findById ใช้เพื่อระบุการเข้าถึงหนังสือแบบเฉพาะตามที่รับคำสั่งมา
    if(error) {
      return next(error);
    }else{
      res.json(data)
    }
  })
})

// Update book
bookRoute.route('/update-book/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, {
    $set: req.body // เป็นการset ของมูลเข้าไปที่ req.body
  }, (error, data) => {
    if(error) {
      return next(error);
    }else{
      res.json(data);
      console.log('Book Update Successfully');
    }
  })
})

// Delete book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    }else{
      res.status(200).json({
        msg: data // หลังจากลบข้อมูลก็จะมีการเก็บไว้ใน msg
      });
    }
  })
})
module.exports = bookRoute; //export ข้อมูล
