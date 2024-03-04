const express=require('express')
const { CreateBrand, fetchBrand } = require('../controller/BrandController')
const router=express.Router()

router.post('/:id',CreateBrand)
.get('/',fetchBrand)
exports.router=router;