export class CSVFileReader {

  constructor() {
  }

  private csvToArray = (fileContent: string, showErrorOnLoaded?: () => void): string[] => {
    const validationRegexp: RegExp =
      /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
    const valueRegexp: RegExp =
      /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
    if (validationRegexp.test(fileContent)) {
      const valuesList: string[] = []
      fileContent.replace(valueRegexp,
        (_m0, m1, m2, m3) => {
          if (m1 !== undefined) valuesList.push(m1.replace(/\\'/g, '"'))
          else if (m2 !== undefined) valuesList.push(m2.replace(/\\"/g, '"'))
          else if (m3 !== undefined) valuesList.push(m3)
          return ''
        })
      if (/,\s*$/.test(fileContent)) valuesList.push('')
      return valuesList
    } else {
      if (showErrorOnLoaded) {
        showErrorOnLoaded()
      }
      return []
    }
  }

  public read = (file: File, onResult: (stringArray: string[]) => void, onError: () => void): void => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (event: any): void => this.parseLoadedFile(event, onResult, onError)
    reader.onerror = (_event: any): void => this.handleLoadedError(onError)
  }

  private parseLoadedFile = (event: any, onResult: (stringArray: string[]) => void, onError: () => void): void => {
    onResult(this.csvToArray(event.target.result, onError))
  }

  private handleLoadedError = (onError: () => void): void => {
    onError()
  }
}
