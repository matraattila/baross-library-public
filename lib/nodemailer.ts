import nodemailer from 'nodemailer'
import { nodemailerMjmlPlugin } from 'nodemailer-mjml'
import path from 'path'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

transporter.use(
  'compile',
  nodemailerMjmlPlugin({ templateFolder: path.resolve('./emailTemplates') })
)

export default transporter
