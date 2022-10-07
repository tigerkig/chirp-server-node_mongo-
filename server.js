const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const globalErrorHandler = require('./middlewares/errorHandler');
const path = require('path');

connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname , '/uploads')));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth' , require('./routes/authRoutes'));
app.use('/api/user' , require('./routes/userRoutes'));
app.use('/api/post' , require('./routes/postRoutes'));
app.use('/api/group' , require('./routes/groupRoutes'));
app.use('/api/page' , require('./routes/pageRoutes'));
app.use('/api/story' , require('./routes/storyRoutes'))

app.use(globalErrorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT , () => console.log(`server is listening on PORT ${PORT}`));