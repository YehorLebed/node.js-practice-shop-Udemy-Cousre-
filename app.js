const path = require('path');
// Middleware
const express = require('express');
const bodyParser = require('body-parser');
// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// Controllers
const errorContoller = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
 
app.use(errorContoller.get404);

app.listen(3000);
