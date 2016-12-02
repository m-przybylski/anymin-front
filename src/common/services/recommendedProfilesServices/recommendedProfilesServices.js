(function() {
  function recommendedProfilesServices($q, $log, SearchApi) {

    const _onFindRecommended = (recommendedProfiles, services) => {
      const currentConsultation = _.find(recommendedProfiles.results, o => o.id === services[0].service.id)

      if (!!currentConsultation) {
        recommendedProfiles.results = _.remove(recommendedProfiles.results, (n) => {
          // TODO Remove tags by service id and profile id
          return n.id !== services[0].service.id
        })
      }
      return recommendedProfiles.results
    }

    const _onFindRecommendedError = () => {
      $log.warn('Similar profiles not found')
      return $q.resolve([])
    }

    const _getTagId = (services) => {
      if (!!services && services.length > 0) {
        const tagsArray = services[0].tags
        if (tagsArray && tagsArray.length > 0) {
          return tagsArray[0].id
        }
        return null

      }
      return null
    }

    const _getRecommendedCompanies = (services) => {
      const tagId = _getTagId(services)
      if (tagId) {
        return SearchApi.search({
          'tag.id': tagId,
          'profile.type': 'ORG',
          'limit': 10
        }).$promise.then((response) => _onFindRecommended(response, services), _onFindRecommendedError)

      } else {
        return $q.resolve([])
      }
    }

    const _getRecommendedExperts = (services) => {
      const tagId = _getTagId(services)
      if (tagId) {
        return SearchApi.search({
          'tag.id': tagId,
          'profile.type': 'EXP',
          'limit': 10
        }).$promise.then((response) => _onFindRecommended(response, services), _onFindRecommendedError)
      } else {
        return $q.resolve([])
      }
    }


    return {
      getRecommendedExperts: _getRecommendedExperts,
      getRecommendedCompanies: _getRecommendedCompanies
    }
  }
  angular.module('profitelo.services.recommended-profiles-service', [
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
    .service('recommendedProfilesServices', recommendedProfilesServices)

}())