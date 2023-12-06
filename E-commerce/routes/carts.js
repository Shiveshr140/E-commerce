// const express = require('express')
// const router = express.Router()

// //// Recieve POST request to add item to the cart
// router.post('/cart/products', (req,res)=>{
//     console.log(req.body.productId)
//     res.send('Products are added to the cart')
// })

// //// Recieve GET request to show all the items in the cart

// //// Recieve a POST request to delete the item the cart


// module.exports = router;




////************************************************* Creating a cart

// const express = require('express')
// const router = express.Router()

// const cartsRepo = require('../repositories/carts')

// //// Recieve POST request to add item to the cart
// router.post('/cart/products', async (req,res)=>{
//     /// Figure Out the cart 
//     let cart;      //// just make sure it will be available later on
//     if(!req.session.cartId){
//         //// We do not have a cart, we need to have one
//         //// and store the cardId on req.session.cardId proprerty
//         cart = await cartsRepo.create({items : [] })
//         req.session.cartId = cart.id
//     }
//     else{
//         //// we have the cart! lets get it from the repository
//         cart = await cartsRepo.getOne(req.session.cartId)
//     }
 
//     console.log(cart)  //// first tym we will get from if statement { items: [], id: '18959171' }
    
//     //// Either increment the quantity for exsisting product

//     //// Or add new product to the item array
    

//     res.send('Products are added to the cart')
// })

// //// Recieve GET request to show all the items in the cart

// //// Recieve a POST request to delete the item the cart


// module.exports = router;




////****************************************************  adding items to the cart

// const express = require('express')
// const router = express.Router()

// const cartsRepo = require('../repositories/carts')

// //// Recieve POST request to add item to the cart
// router.post('/cart/products', async (req,res)=>{
    
//     let cart;      
//     if(!req.session.cartId){
//         cart = await cartsRepo.create({items : [] })
//         req.session.cartId = cart.id
//     }
//     else{
//         cart = await cartsRepo.getOne(req.session.cartId)
//     }
    
//     const existingItem = cart.items.find((item)=> item.id === req.body.productId )
//     if(existingItem){
//         // increment quantity and save the cart
//         existingItem.quantity++;
//     }
//     else{
//         // add new product id to items array
//         cart.items.push({id: req.body.productId, quantity:1})
//     }
//     //// now save this cart

//     await cartsRepo.update(cart.id, { items: [...cart.items] });



 
//     res.send('Products are added to the cart')
// })
    
    


// //// Recieve GET request to show all the items in the cart

// //// Recieve a POST request to delete the item the cart


// module.exports = router;




////********************************************************* Display cart items
//// ************** at the end we form the show.js in views/carts

const express = require('express')
const router = express.Router()

const cartsRepo = require('../repositories/carts')
const productsRepo = require('../repositories/products')
const cartShowTemplate = require('../views/carts/show')

//// Recieve POST request to add item to the cart
router.post('/cart/products', async (req,res)=>{
    
    let cart;      
    if(!req.session.cartId){
        cart = await cartsRepo.create({items : [] })
        req.session.cartId = cart.id
    }
    else{
        cart = await cartsRepo.getOne(req.session.cartId)
    }
    
    const existingItem = cart.items.find((item)=> item.id === req.body.productId )
    if(existingItem){
        existingItem.quantity++;
    }
    else{
        cart.items.push({id: req.body.productId, quantity:1})
    }
   await cartsRepo.update(cart.id, { items: [...cart.items] });

    res.redirect('/cart')
})
    
//// Recieve GET request to show all the items in the cart
router.get('/cart', async (req, res)=>{
    //// if user directly come to this route without having a cart just redirect them to home
    if(!req.session.cartId){
        return res.redirect('/')
    }

    const cart = await cartsRepo.getOne(req.session.cartId)

    for(let item of cart.items){
        const product = await productsRepo.getOne(item.id)
        
        //// Html tp have access to this product
        item.product = product;
       
    }
    res.send(cartShowTemplate({items: cart.items}))
})
        

//// Recieve a POST request to delete the item the cart
router.post('/cart/products/delete', async (req, res)=>{
    const {itemId} = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId)
    const items = cart.items.filter((item) => item.id !== itemId)
    await cartsRepo.update(req.session.cartId, { items: items });


    res.redirect('/cart')
})


module.exports = router;