

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products')
const productsRouter = require('./routes/products')
const cartsRouter = require('./routes/carts')

// Load environment variables from .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static('public')) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: [process.env.SESSION_KEY]
  })
);
app.use(authRouter);
app.use(productsRouter)
app.use(adminProductsRouter)
app.use(cartsRouter)

app.listen(PORT, () => {
  console.log('Listening');
});







