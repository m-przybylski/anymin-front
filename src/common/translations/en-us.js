angular.module('profitelo.translations.en-us', [])

.config(function($translateProvider) {

  return $translateProvider.translations('en-us', {
    // Pluralizations
    // **Pluralization** according to current language.
    // More info on how to translate (what formats are available for current language) you'll find in
    // [THIS WEBSITE](http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html)

    // If nothing set it'll show default strings in HTML templates

    'GENERAL.LOADING': 'Loading',
    'GENERAL.SEND': 'Send',
    'GENERAL.SAVE': 'Save',
    'GENERAL.SAVE_AND_NEXT': 'Save and next',

    'EXPERT_PROFILE.EXPERT_PROFILE': 'Expert\'s profile',
    'EXPERT_PROFILE.ACTIVE_PROFILE': 'Active profile',
    'EXPERT_PROFILE.INACTIVE_PROFILE': 'Inactive profile',
    'EXPERT_PROFILE.FIRSTNAME_LASTNAME_OR_COMPANY_PLACEHOLDER': 'First name and last name (or company name)',
    'EXPERT_PROFILE.GENERAL_INFO_PLACEHOLDER': 'General informations',
    'EXPERT_PROFILE.PROFILE_STATUS_TOOLTIP': 'Tooltip about active and inactive profile',
    'EXPERT_PROFILE.PROFILE_BACKGROUND_TOOLTIP': 'Tooltip about profile\'s background',
    'EXPERT_PROFILE.PROFILE_AVATAR_TOOLTIP': 'Tooltip about profile\'s avatar',
    'EXPERT_PROFILE.PROFILE_ON_BEHANCE_TOOLTIP': 'Tooltip about user\'s profil,e on behance',
    'EXPERT_PROFILE.PROFILE_VIDEOS_TOOLTIP': 'Tooltip about profile\'s videos',
    'EXPERT_PROFILE.PROFILE_SOCIAL_MEDIA_TOOLTIP': 'Tooltip about profile\'s social media relations',
    'EXPERT_PROFILE.PROFILE_CERTIFICATES_TOOLTIP': 'Tooltip about profile\'s certificates, documents, diplomas',
    'EXPERT_PROFILE.MESSAGES.FULLNAME_REQUIRED': 'Fullname field is required',
    'EXPERT_PROFILE.MESSAGES.DATA_SAVED_SUCCESSFULLY': 'Data saved successfully',
    'EXPERT_PROGRESS.EXPERT.TITLE':'Expert profile',
    'EXPERT_PROGRESS.EXPERT.DESCRIPTION':  'Create your business card! Describe company, add reference...',
    'EXPERT_PROGRESS.EXPERT.UISREF.TITLE': 'Fill profile informations',
    'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE':'View profile',
    'EXPERT_PROGRESS.SERVICES.TITLE':'Services',
    'EXPERT_PROGRESS.SERVICES.DESCRIPTION': 'Describe what are you doing and what help ppl can get from you',
    'EXPERT_PROGRESS.SERVICES.UISREF.TITLE': 'Add service',
    'EXPERT_PROGRESS.SERVICES.UISREF.TITLE.DONE':'View service',
    'EXPERT_PROGRESS.VERIFICATION.TITLE': 'Verification',
    'EXPERT_PROGRESS.VERIFICATION.DESCRIPTION': 'Verify profile. We will check if everything is OK',
    'EXPERT_PROGRESS.VERIFICATION.UISREF.TITLE': 'Send to verification'
  })
})
