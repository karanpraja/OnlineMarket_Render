const express=require('express')
const { CreateCategory, fetchCategory } = require('../controller/CategoryController')
const router=express.Router()

router.post('/:id',CreateCategory).get('/',fetchCategory)
exports.router=router