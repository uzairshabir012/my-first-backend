const express = require('express');
const authRouter = require('./router/auth.router');
const postRoute = require('./router/post.router');
const cookieParser = require('cookie-parser');


const app = express();


app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRoute)

module.exports = app;