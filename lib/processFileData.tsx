import { type Book } from '@/interfaces/Book'
import removeSpecials from './removeSpecials'

export default function handler(fileData, setBookList) {
  const BookList = []

  // Create rows
  const Rows = fileData.split('\n')
  // Remove header
  const withoutHeader = Rows.slice(1, Rows.length)

  let Book: Book
  withoutHeader.forEach((row) => {
    const getFields = row.split('\t')
    const fields = {
      raktariJel: getFields[0],
      cutterSzam: getFields[1],
      bibliografia: getFields[2].trim(), // Remove \r and whitespaces
    }

    const biblioFields = fields.bibliografia.split('. -').map((item) => item.trim())

    const cim = biblioFields[0].includes(':')
      ? biblioFields[0].split(':')[0]
      : biblioFields[0].split('/')[0] || ''

    const szerzoiAdatok = biblioFields[0].includes('/')
      ? biblioFields[0].split('/')[1]
      : biblioFields[0].split(':')[1] || ''

    const kiadas = biblioFields[1] ? (biblioFields[1].includes('kiad') ? biblioFields[1] : '') : ''
    const megjelenes = biblioFields[1]
      ? biblioFields[1].includes('kiad')
        ? biblioFields[2]
        : biblioFields[1]
      : ''
    const fizikaiJellemzok = biblioFields[2]
      ? biblioFields[2].includes('cm')
        ? biblioFields[2]
        : biblioFields[3]
      : ''
    const sorozat = biblioFields[3] ? (biblioFields[3].includes('(') ? biblioFields[3] : '') : ''
    const kategoria = szerzoiAdatok.includes('/') ? removeSpecials(szerzoiAdatok.split('/')[0]) : ''

    // const Bibliografia: Bibliografia = {
    //   cim,
    //   szerzoiAdatok: {
    //     szerzo: szerzoiAdatok.split(';')[0].trim(),
    //     adatok: szerzoiAdatok.trim(),
    //   },
    //   kiadas,
    //   megjelenes,
    //   fizikaiJellemzok,
    //   sorozat,
    //   kategoria,
    // }

    Book = {
      raktariJel: fields.raktariJel,
      cutterSzam: fields.cutterSzam,
      // bibliografia: Bibliografia,
      cim,
      szerzoiAdatok: {
        szerzo: szerzoiAdatok.split(';')[0].trim(),
        adatok: szerzoiAdatok.split(';').slice(1).join(';'),
      },
      kiadas,
      megjelenes,
      fizikaiJellemzok,
      sorozat,
      kategoria,
    }
    BookList.push(Book)
  })

  setBookList(BookList)
}
