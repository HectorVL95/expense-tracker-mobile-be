import { connect } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export const connect_to_db = async () => {
  try {
    connect(process.env.DB as string, {
    dbName: process.env.DB_NAME
  })
  console.log(`Connected to database ${process.env.DB_NAME}`)
  } catch (error) {
    console.error('Not connected to db', error)
  }

}

