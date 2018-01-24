import {ActivitiesQueryParams} from './activities-query-params'
import {FinancialOperation, GetActivity} from 'profitelo-api-ng/model/models'

describe('Unit testing: activities query params >', () => {
  describe('for activities query params>', () => {

    let activitiesQueryParams: ActivitiesQueryParams

    beforeEach(inject(() => {
      activitiesQueryParams = new ActivitiesQueryParams
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should set and get activity type', () => {
      activitiesQueryParams.setActivityType(GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT)
      expect(activitiesQueryParams.getActivityType()).toEqual(GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT)
    })

    it('should set and get profile Id ', () => {
      activitiesQueryParams.setProfileId('profileId')
      expect(activitiesQueryParams.getProfileId()).toEqual('profileId')
    })

    it('should set and get service id', () => {
      activitiesQueryParams.setServiceId('ServiceId')
      expect(activitiesQueryParams.getServiceId()).toEqual('ServiceId')

      activitiesQueryParams.setServiceId(undefined)
      expect(activitiesQueryParams.getServiceId()).toEqual(undefined)
    })

    it('should set and get account type', () => {
      activitiesQueryParams.setAccountType(FinancialOperation.AccountTypeEnum.PROFILE)
      expect(activitiesQueryParams.getAccountType()).toEqual(FinancialOperation.AccountTypeEnum.PROFILE )
    })

    it('should set and get date from', () => {
      activitiesQueryParams.setDateFrom('Tue Jan 23 2018 00:00:00 GMT+0100 (CET)')
      expect(activitiesQueryParams.getDateFrom()).toEqual('1516662000000')
    })

    it('should set and get date to', () => {
      activitiesQueryParams.setDateTo('Tue Jan 23 2018 00:00:00 GMT+0100 (CET)')
      expect(activitiesQueryParams.getDateTo()).toEqual('1516748399000')
    })

    it('should set and get limit', () => {
      activitiesQueryParams.setLimit(1993)
      expect(activitiesQueryParams.getLimit()).toEqual('1993')
    })

    it('should set and get offset', () => {
      activitiesQueryParams.setOffset(0)
      expect(activitiesQueryParams.getOffset()).toEqual('0')

      activitiesQueryParams.setOffset(-10)
      expect(activitiesQueryParams.getOffset()).toEqual('0')
    })

  })
})
