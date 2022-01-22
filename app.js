import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import config from "./app/config/config.js";
import {createConnection} from "./app/util/redis.util.js";

import usersRouter from "./app/routes/user.router.js";
import healthRouter from "./app/routes/health.router.js";
import signRouter from "./app/routes/sign.router.js";

config();

const app = express();

mongoose.connect(process.env.MONGO_DB).then();

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

await createConnection({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);
app.use('/', healthRouter);
app.use('/sign', signRouter);

// listening to port
app.listen(Number(process.env.APP_PORT || 3000), '0.0.0.0',()=> console.log(`Server Running at port: ${process.env.APP_PORT || 3000}`));
