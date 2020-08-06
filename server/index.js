const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' })
connectDB();

const pages = require('./routes/pages');
const app = express();

app.use(express.json());
app.use('/api/v1/pages', pages);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));