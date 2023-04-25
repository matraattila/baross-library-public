import mongoose, { Schema } from 'mongoose'
import { UserDB } from '@/interfaces/User'

const UserSchema = new Schema<UserDB>({
  email: String,
  password: String,
  role: String,
  avatar: String,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
