const express = require('express');

const app = express();

const sequelize = require('./config/db')

const users = require('./model/users')

const router = require('./router/users_router')

const globalerror = require('./utils/glberr')

const CustomError = require('./utils/cuserr')

app.use(express.json());

sequelize.sync()
    .then(() => {
        console.log({message:'Database connected and tables created'});
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

app.use(router)

app.all('*', (req, res, next) => {
    const err = new CustomError(404, `can't find ${req.originalUrl} on the server!`);
    next(err);
})

app.use(globalerror)

const port = 5000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});