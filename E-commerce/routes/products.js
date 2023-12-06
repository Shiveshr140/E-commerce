
/////********************* Products indexing

const productsRepo = require('../repositories/products')
const productsIndexedTemplates = require('../views/products/index')

const express = require('express')
const router = express.Router()

router.get('/', async (req, res)=>{
    const products = await productsRepo.getAll()
    res.send(productsIndexedTemplates({products}))
})


module.exports = router;