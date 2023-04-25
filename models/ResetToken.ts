import mongoose, { Schema } from 'mongoose'

export interface ResetTokenProps {
  email: string
  token: string
  expiration: Date
}

const ResetTokenSchema: Schema = new Schema({
  email: String,
  token: String,
  expiration: Date,
})

export default mongoose.models.ResetToken || mongoose.model('ResetToken', ResetTokenSchema)
