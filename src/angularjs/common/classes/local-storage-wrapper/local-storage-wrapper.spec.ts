import {LocalStorageWrapper} from './local-storage-wrapper'

describe('Unit tests: LocalStorageWrapper', () => {
  describe('LocalStorageWrapper', () => {

    it('should exsist', () => {
      expect(LocalStorageWrapper).toBeTruthy()
    })

    it('should set and get item', () => {
      const testObject = {
        email: 'itelo@kkkkk.pl'
      }
      LocalStorageWrapper.setItem('invitation', JSON.stringify(testObject))

      expect(LocalStorageWrapper.getItem('invitation')).toEqual(JSON.stringify(testObject))
    })

    it('should set and get item', () => {
      const testObject = {
        email: 'itelo@kkkkk.pl'
      }
      LocalStorageWrapper.setItem('invitation', JSON.stringify(testObject))

      expect(LocalStorageWrapper.getItem('invitation')).toEqual(JSON.stringify(testObject))
    })

    it('should set item and then remove it', () => {
      const testObject = {
        email: 'itelo@kkkkk.pl'
      }
      LocalStorageWrapper.setItem('invitation', JSON.stringify(testObject))
      expect(LocalStorageWrapper.getItem('invitation')).toEqual(JSON.stringify(testObject))
      LocalStorageWrapper.removeItem('invitation')
      expect(LocalStorageWrapper.getItem('invitation')).toEqual(null)
    })
  })
})
