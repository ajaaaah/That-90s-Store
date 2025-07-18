const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//log HTTP requests
const morgan = require('morgan');
// mongoose is used for MongoDB object modeling
const mongoose = require('mongoose');

require('dotenv').config();
const api = process.env.API_URL;

const productsRouter = require('./routers/products');


//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);

//Models
// Import the Product model from the models directory
const Product = require('./models/product');




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
