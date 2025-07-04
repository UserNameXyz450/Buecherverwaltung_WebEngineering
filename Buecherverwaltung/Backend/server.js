const express = require('express');
const dotenv = require('dotenv');
const mongoDB = require('./config/mongodb');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');

dotenv.config();
mongoDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./middleware/auth');

app.use('/uploads', express.static('uploads'));

const isAuth = require('./middleware/isAuth');
//const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/routes');
const secureRoutes = require('./routes/secure-routes');
const libraryRoutes = require('./routes/libraryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', secureRoutes);
app.use('/api/library', isAuth, libraryRoutes);
app.use('/api/reviews', isAuth, reviewRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Backend API alive, somewhat.'});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));