import { Dispatch } from 'react'
import processFileData from './processFileData'

export default function handler(file: File, setBookList: Dispatch<any>) {
  let fileReader,
    isCancel = false

  if (file) {
    fileReader = new FileReader()

    fileReader.onload = (e: { target: { result: any } }) => {
      const { result } = e.target
      if (result && !isCancel) {
        // Creating Book objects then saving each of them into an array
        processFileData(result, setBookList)
      }
    }

    fileReader.readAsText(file)
  }

  return () => {
    isCancel = true
    if (fileReader && fileReader.readyState === 1) {
      fileReader.abort()
    }
  }
}
