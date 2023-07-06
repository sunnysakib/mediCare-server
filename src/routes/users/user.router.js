const express = require('express');
const verifyJWT = require('../../utilites/verifyJWT');
const { httpGetAllUser, httpPutUserEmail, httpPutUserRoleAdmin } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/',verifyJWT, httpGetAllUser);
userRouter.put('/:email', httpPutUserEmail);
userRouter.put('/admin/:email',verifyJWT, httpPutUserRoleAdmin);

module.exports = userRouter;