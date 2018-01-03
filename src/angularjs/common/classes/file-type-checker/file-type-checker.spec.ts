import {FileCategoryEnum, FileTypeChecker} from './file-type-checker'

describe('Unit tests: FileTypeChecker', () => {
  describe('FileTypeChecker', () => {
    it('should exsist', () => {
      const file = {
        type: 'image/png'
      }
      expect(FileTypeChecker.isFileFormatValid(<File>file, FileCategoryEnum.AVATAR)).toBeTruthy()
    })
  })
})
