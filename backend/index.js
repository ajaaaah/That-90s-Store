const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//log HTTP requests
const morgan = require('morgan');
// mongoose is used for MongoDB object modeling
const mongoose = require('mongoose');

// Import routers
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const cors = require('cors');
const authenticateJwt = require('./helpers/jwt');


// Load environment variables from .env file
require('dotenv').config();
const api = process.env.API_URL;
app.use(cors());

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(`${api}/orders`, authenticateJwt(), ordersRouter);
app.use(`${api}/users`, authenticateJwt(), usersRouter);
// Leave products and categories public for now:
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'The user is not authorized' });
  }
  return res.status(500).json({ message: err.message });
});


//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoriesRouter); 
app.use(`${api}/users`, usersRouter);


//Database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    dbName: 'eshop-database' // Specify the database name
}).then(() => {
    console.log('Database connection is ready...');
}).catch((err) => {
    console.log(err);
});


//Sever
app.listen(3000, () => {
console.log('Server running on port http://localhost:3000/');
});
