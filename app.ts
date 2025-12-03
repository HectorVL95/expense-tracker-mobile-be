import express from 'express'
import helmet from 'helmet'
import sanitize from 'express-mongo-sanitize'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { connect_to_db } from './src/utils/db.ts'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import user_route from './src/api/user/user-route.ts'


dotenv.config()

const app = express()
const safe_use = (mw: unknown) => app.use(mw as express.RequestHandler);
safe_use(cors({origin: process.env.CORS}))

app.use(ExpressMongoSanitize)

connect_to_db()

app.use('user/api', user_route)

app.listen(process.env.PORT, () => {
  console.log(`connected to port: ${process.env.PORT}`)
})