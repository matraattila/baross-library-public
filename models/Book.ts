import mongoose, { Schema } from 'mongoose'

const BookSchema = new Schema(
  {
    raktariJel: { type: Number, unique: true },
    cutterSzam: String,
    cim: { type: String, required: true },
    szerzoiAdatok: {
      szerzo: String,
      adatok: String,
    },
    kiadas: String,
    megjelenes: String,
    fizikaiJellemzok: String,
    sorozat: String,
    megjegyzesek: String,
    kategoria: String,
  },
  { timestamps: true }
)

export default mongoose.models.Book || mongoose.model('Book', BookSchema)
