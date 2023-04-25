import { ObjectId } from 'mongodb'

export interface UserDB {
  _id?: ObjectId
  email: string
  password: string
  role: string
  avatar: string
}

export interface UserApp {
  id: string
  email: string
  role: string
  avatar: string | boolean
}
