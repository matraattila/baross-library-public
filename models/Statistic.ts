import mongoose, { Schema } from 'mongoose'

export interface UploadProps {
  value: number
  date: Date
}

export interface StatisticProps {
  bookCount: number
  uploads: UploadProps[]
}

const StatisticSchema = new Schema<StatisticProps>({
  bookCount: Number,
  uploads: [
    {
      value: Number,
      date: Date,
    },
  ],
})

export default mongoose.models.Statistic || mongoose.model('Statistic', StatisticSchema)
