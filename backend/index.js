const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//log HTTP requests
const morgan = require('morgan');
// mongoose is used for MongoDB object modeling
const mongoose = require('mongoose');

require('dotenv').config();
const api = process.env.API_URL;

// Import routers
const productsRouter = require('./routers/products');
const ordersRouter = require('./routers/orders');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const authenticateJwt = require('./helpers/jwt');


//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authenticateJwt);


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
