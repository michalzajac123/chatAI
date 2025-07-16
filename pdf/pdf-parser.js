import fs from 'fs'
import path from 'path'
import pdf2md from '@opendocsg/pdf2md'

const pdfBuffer = fs.readFileSync("./diag1.pdf")
pdf2md(pdfBuffer, () => {})
  .then(text => {
    // podziel tekst na 500 znakowe ciagi i zapisz jako tablica do pliku ustaw tez id dla kazdego ciagu rosnace
    const lines = text.match(/.{1,500}/g) || []
    const outputData = lines.map((line, index) => ({
      id: index + 1,
      text: line
    }))
    // Zapisz do pliku JSON
    const outputFile = 'pdf.json'
    console.log(`Writing to ${outputFile}...`)
    fs.writeFileSync(path.resolve(outputFile), JSON.stringify(outputData, null, 2))
    console.log('Done.')
  })
  .catch(err => {
    console.error(err)
  })