## AnyMind Angular Core library changelog

<a name="February 21, 2019"></a>
### v0.12.27 - February 21, 2019
Feature:
* Move `SeoService` from widget to core

<a name="February 21, 2019"></a>
### v0.12.27 - February 21, 2019
Fix:
* fix file download url in `MessagePipe`

<a name="February 13, 2019"></a>
### v0.12.24 - February 13, 2019
Feature:
* fix submit-button component html path

<a name="February 11, 2019"></a>
### v0.12.23 - February 11, 2019
Feature:
* fix autofocus directive

<a name="February 05, 2019"></a>
### v0.12.17 - February 05, 2019
Feature:
* move repository to different solution

<a name="February 04, 2019"></a>
### v0.12.16 - February 04, 2019
Feature:
* new component `InputSetPasswordComponent`

<a name="February 01, 2019"></a>
### v0.12.15 - February 01, 2019
Fix:
* `InputPhoneEmailComponent` styles and placeholder

<a name="January 31, 2019"></a>
### v0.12.14 - January 31, 2019
Added:
* Show danger alert when network connection was changed in pending call
* `NetworkConnectionService`

<a name="January 29, 2019"></a>
### v0.12.13 - January 29, 2019
Fix:
* `InputPhoneEmailComponent` show validation error

<a name="January 25, 2019"></a>
### v0.12.10 - January 25, 2019
Fix:
* improve input into credit-card-image

<a name="January 24, 2019"></a>
### v0.12.9 - January 24, 2019
Fix:
* hide icons in communicator

<a name="January 28, 2019"></a>
### v0.12.11 - January 28, 2019
Feature:
* change inactiveTimeout to 5000

<a name="January 21, 2019"></a>
### v0.12.8 - January 21, 2019
Feature:
* new component `InputPhoneEmailComponent`

<a name="January 17, 2019"></a>
### v0.12.7 - January 17, 2019
Improve:
* Improve display icon on Firefox

<a name="January 15, 2019"></a>
### v0.12.06 - January 15, 2019
Improve:
* Logger returns arguments instead of array of arguments now

<a name="January 15, 2019"></a>
### v0.12.05 - January 15, 2019
Improve:
* Improve communicator messenger (styles, ESC keydown handling)

<a name="January 15, 2019"></a>
### v0.12.4 - January 15, 2019
Fix:
* handling upload files (0kb size)

<a name="January 15, 2019"></a>
### v0.12.3 - January 15, 2019
Fix:
* messages styles in chat (`break-word`)

<a name="January 14, 2019"></a>
### v0.12.2 - January 14, 2019
Fix:
* Communicator module injecting

<a name="January 10, 2019"></a>
### v0.12.1 - January 10, 2019
Improve:
* Bug fixes

<a name="January 09, 2019"></a>
### v0.12.0 - January 09, 2019
Improve:
* Upgrade to Angular 7.x

<a name="January 10, 2019"></a>
### v0.11.01 - January 10, 2019
Improve:
* Refactor callDestroyedEvent
* Fix bug with connection between safari desktop and android devices without support for safari codec.

<a name="January 8, 2019"></a>
### v0.11.0 - January 08, 2019
Improve:
* update machoke-sdk to 4.0.0

Update:
* Rxjs to 6.3.3

Remove:
* CommunicatorReconnectionService - reconnection is now integrated inside machoke-sdk

<a name="January 8, 2019"></a>
### v0.10.34 - January 08, 2019
Fix:
* Improve `user-avatar` component

<a name="January 07, 2019"></a>
### v0.10.33 - January 07, 2019
Improve:
* Navigation service inactive/active method

<a name="January 07, 2019"></a>
### v0.10.32 - January 07, 2019
Improve:
* Add missing key for phone input component

<a name="January 04, 2019"></a>
### v0.10.31 - January 04, 2019
Improve:
* submit button: set disable on isDisable flag

<a name="January 04, 2019"></a>
### v0.10.30 - January 04, 2019
Improve:
* Add new icons

<a name="December 27, 2018"></a>
### v0.10.29 - December 27, 2018
Fix:
* Disabled status for radio/checkbox inputs

<a name="December 20, 2018"></a>
### v0.10.28 - December 20, 2018
Improve:
* Add border-radius to Messenger Avatar

<a name="December 20, 2018"></a>
### v0.10.27 - December 20, 2018
Improve:
* Update icon fonts

<a name="December 18, 2018"></a>
### v0.10.26 - December 18, 2018
Fix:
* `InputRadioComponent` `disabled` property

<a name="December 17, 2018"></a>
### v0.10.24 - December 17, 2018
Improve:
* Improve style import inside components and external (platform/widget)

<a name="December 14, 2018"></a>
### v0.10.23 - December 14, 2018
Improve:
* Update @anymind-ng/api, moneyDTO: change amount to value property

<a name="December 12, 2018"></a>
### v0.10.22 - December 12, 2018
Improve:
* Update @anymind-ng/api, change price property inside current client call

<a name="December 10, 2018"></a>
### v0.10.21 - December 10, 2018
Improve:
* `MessagePipe` to show links

<a name="December 7, 2018"></a>
### v0.10.1 - December 7, 2018
Improve:
* change email regex

<a name="December 5, 2018"></a>
### v0.10.1 - December 5, 2018
Fix:
* text message as link in `MessagePipe`

<a name="December 05, 2018"></a>
### v0.10.0 - December 05, 2018
Improve:
* Add client-call.service which is responsible for starting a call

<a name="December 5, 2018"></a>
### v0.9.2 - December 5, 2018
Fix:
* text message as link in `MessagePipe`
* styles in `.grouped-messages`

<a name="December 3, 2018"></a>
### v0.9.1 - December 3, 2018
Change:
* delete animation on typing text in `TextareaComponent`

<a name="November 30, 2018"></a>
### v0.9.0 - November 30, 2018
Change:
* update machoke-sdk to 3.0.1

<a name="November 29, 2018"></a>
### v0.8.1 - November 29, 2018
Fix:
* Hide submit-button loader when button is not clicked

<a name="November 22, 2018"></a>
### v0.8.0 - November 22, 2018
Change:
* Updated machoke-sdk to 2.0.2

<a name="November 22, 2018"></a>
### v0.7.23 - November 22, 2018
Fix:
*  Remove onPush changeDetection strategy

<a name="November 20, 2018"></a>
### v0.7.22 - November 20, 2018
Add:
* `validatorFn` and `pattern` binding to `CustomInputNumericComponent`

<a name="November 19, 2018"></a>
### v0.7.21 - November 19, 2018
Improve:
* Remove onPush changeDetection strategy from inputs 

<a name="November 16, 2018"></a>
### v0.7.20 - November 16, 2018
Improve:
* Refactor navigation.service

<a name="November 15, 2018"></a>
### v0.7.19 - November 15, 2018
Improve:
* Add auto-focus in communicator chat
* Add client data to communicator
Fix:
* Removed error log for default message type
* Add broken image to chat

<a name="November 14, 2018"></a>
### v0.7.18 - November 14, 2018
Fix:
* Add onPush changeDetection strategy to inputs

<a name="November 14, 2018"></a>
### v0.7.17 - November 14, 2018
Fix:
* Remove window.requestAnimationFrame from textarea-auto-height directive

<a name="November 9, 2018"></a>
### v0.7.16 - November 9, 2018
Fix:
* Reset messages counter on navigation component destroyed

<a name="November 9, 2018"></a>
### v0.7.15 - November 9, 2018
Improve:
* Lower safari resolution to 480p becasue of lack of network congestion control in webkit

<a name="November 8, 2018"></a>
### v0.7.13 - November 8, 2018
Added:
* fix `TextareaAutoHeightDirective` getting height element

<a name="November 8, 2018"></a>
### v0.7.13 - November 8, 2018
Added:
* `isZeroValueAllowed` binding to `InputPriceComponent`

<a name="November 7, 2018"></a>
### v0.7.12 - October 30, 2018
Fixed:
* Equalizer border

<a name="October 30, 2018"></a>
### v0.7.11 - October 30, 2018
Added:
* font size variable: `$f-icon-20`

Changed:
* `lint-height` in `paragraph` mixin from `20px` to `22px` 

<a name="October 29, 2018"></a>
### v0.7.1 - October 29, 2018
Changed:
* remove logger service provider

<a name="October 29, 2018"></a>
### v0.7.0 - October 29, 2018
Changed:
* remove circular dependency warning during build
* add logger service provide to utilize Angular DI

<a name="October 26, 2018"></a>
### v0.6.0 - October 26, 2018
Changed:
* Updated Machoke sdk to 1.0.0
* Leave the call only on `failed` stage instead of `disconnected`
* Enable webrtc reconnects on the same network/connection

<a name="October 25, 2018"></a>
### v0.5.5 - October 25, 2018
Changed:
* update icon generator
* script to scrape icons

<a name="October 25, 2018"></a>
### v0.5.4 - October 18 2018
Changed:
* Check browser WebRTC support before call enumerateDevices method

<a name="October 23, 2018"></a>
### v0.5.3 - October 18 2018
Changed:
* Catch error from indicateTyping event

<a name="October 18, 2018"></a>
### v0.5.0 - October 18 2018
Changed:
* Replace ratel-sdk-js with machoke-sdk

<a name="October 17, 2018"></a>
### v0.4.33 - October 17 2018
Added:
* `participantAvatarUrl` and `mineAvatarUrl` bindings to `GroupedMessagesComponent`
* add options to alerts container

<a name="October 17, 2018"></a>
### v0.4.32 - October 17 2018
Added:
* `clientAvatarUrl` and `expertAvatarUrl` bindings to `GroupedMessagesComponent`
* default avatar when bindings are not specified

<a name="October 8, 2018"></a>
### v0.4.31 - October 2 2018
Changed:
* Fix radio label styles
* improve user-avatar component
* change equalizer size 

<a name="October 2, 2018"></a>
### v0.4.30 - October 2 2018
Changed:
* improve `TextareaAutoHeightDirective` autoheight in modals

<a name="October 2, 2018"></a>
### v0.4.29 - October 2 2018
Changed:
* improve font-size of icons

<a name="October 1, 2018"></a>
### v0.4.28 - October 1 2018
Changed:
* fix card name

<a name="October 1, 2018"></a>
### v0.4.27 - October 1 2018
Changed:
* input color style when it is disabled

<a name="September 19, 2018"></a>
### v0.4.24 - September 19 2018
Fixed:
* Fixed wrong call state on call destroy

<a name="September 16, 2018"></a>
### v0.4.23 - September 16 2018
Changed:
* Refactored Calls logic
* call hangup now returns promise and does not emit end$ event
* end$ event is emitted only if you are in the call and have internet connection

<a name="September 12, 2018"></a>
### v0.4.21 - September 12 2018
Changed:
* refactor validation in `InputPhoneNumberComponent`
* added `MsisdnChangedSuccess` to `Alerts`

<a name="September 11, 2018"></a>
### v0.4.1 - September 11 2018
Changed:
* Use UserConfig instead of Config for ratel-sdk-js

<a name="September 11, 2018"></a>
### v0.4.0 - September 11 2018
Changed:
* Remove briefcase - auth with ApiKey instead of signature 

<a name="September 4, 2018"></a>
### v0.3.31 - September 4 2018
Changed:
* improve style architecture and global styles

<a name="September 2, 2018"></a>
### v0.3.30 - September 2 2018
Changed:
* add input-size enum for text-input

<a name="August 30, 2018"></a>
### v0.3.29 - August 30 2018
Changed:
* export money pipes

<a name="August 30, 2018"></a>
### v0.3.28 - August 30 2018
Changed:
* changeLogLevel to use factory instead of value

<a name="August 29, 2018"></a>
### v0.3.27 - August 289 2018
Changed:
* fix `line-height` in Chat

<a name="August 29, 2018"></a>
### v0.3.26 - August 289 2018
Changed:
* add `ImageBrokenDirective` for broken images (f.ex. 404)

<a name="August 28, 2018"></a>
### v0.3.25 - August 28, 2018
Changed:
* update fonts

<a name="August 27, 2018"></a>
### v0.3.24 - August 17, 2018
Changed:
* change color variable

<a name="August 27, 2018"></a>
### v0.3.23 - August 17, 2018
Changed:
* created message type directive

<a name="August 17, 2018"></a>
### v0.3.22 - August 17, 2018
Changed:
* add output for cardType

<a name="August 17, 2018"></a>
### v0.3.21 - August 17, 2018
Changed:
* refactor all styles import

<a name="August 17, 2018"></a>
### v0.3.17 - August 17, 2018
Changed:
* added `SessionLoggedOutSuccess` alert in Alerts enum

<a name="August 13, 2018"></a>
### v0.3.13 - August 06, 2018
Changed:
* adjust communicator components for expert

<a name="August 06, 2018"></a>
### v0.3.13 - August 06, 2018
Changed:
* add `innerHTML` attribute to `ContentDefaultComponent`

<a name="July 26, 2018"></a>
### v0.3.11 - July 26, 2018
Changed:
* remove possibility to reveal password in `InputPasswordComponent`

<a name="July 25, 2018"></a>
### v0.3.10 - July 25, 2018
Changed:
* added `isRevealIcon` binding to `InputPasswordComponent`

<a name="July 24, 2018"></a>
### v0.3.8 - July 24, 2018
Changed:
* added `InputEmailErrors` to `InputEmailComponent`

<a name="July 23, 2018"></a>
### v0.3.7 - July 23, 2018
Changed:
* fix translation for recharge-button

<a name="July 23, 2018"></a>
### v0.3.5 - July 23, 2018
Changed:
* added ideal-resolution to video constraints in navigator wrapper.

<a name="July 23, 2018"></a>
### v0.3.5 - July 23, 2018
Changed:
* added new Alert  - `ChangePasswordSuccess`

<a name="July 20, 2018"></a>
### v0.3.4 - July 20, 2018
Changed:
* fix `InputRechargeAccountComponent` styles

<a name="July 20, 2018"></a>
### v0.3.2 - July 20, 2018
Changed:
* fix `InputTextComponent` error in pug (input.length)

<a name="July 18, 2018"></a>
### v0.3.1 - July 18, 2018
Changed:
* changed `.input` margin
* changed `textarea` height

<a name="July 18, 2018"></a>
### v0.3.0 - July 18, 2018
Changed:
* update ratel-sdk

<a name="July 18, 2018"></a>
### v0.2.18 - July 18, 2018
Changed:
* add input-card and credit-card-image components

<a name="July 16, 2018"></a>
### v0.2.16 - July 16, 2018
Changed:
* add `--medum` css class to `input`

<a name="July 16, 2018"></a>
### v0.2.15 - July 16, 2018
Changed:
* add `--circle` css class to `button`'s
* add default `\:host` display for `inputs`

<a name="July 16, 2018"></a>
### v0.2.14 - July 16, 2018
Changed:
* add `--disabled` css class to `button-tertiary`

<a name="July 13, 2018"></a>
### v0.2.13 - July 13, 2018
Changed:
* icon update

<a name="July 13, 2018"></a>
### v0.2.12 - July 13, 2018
Changed:
* improve styles from styleguide

<a name="July 12, 2018"></a>
### v0.2.11 - July 12, 2018
Changed:
* fix `InputTextComponent` pug
* fix input's & textarea style background
* improve `SubmitButtonComponent` preloader component

<a name="July 12, 2018"></a>
### v0.2.10 - July 12, 2018
Changed:
* added: Optional id for submit-button component

<a name="July 12, 2018"></a>
### v0.2.8 - July 12, 2018
Changed:
* added `InputPriceComponent`
* added `input--medium` css class + mixins
* changed name `InputPriceComponent` to `InputRechargeAccountComponent`
* added to config `keyboardCodes`, `moneyDivider`, `inputMasks.priceWithComa`

<a name="July 11, 2018"></a>
### v0.2.7 - July 11, 2018
Changed:
* added `isSubmitType` optional binding to `SubmitButtonComponent`
* added `CreateConsultationSuccess` to `Alerts`
* added `--disabled` css class to `button--tertiary`

<a name="July 6, 2018"></a>
### v0.2.6 - July 6, 2018
Changed:
* merging anymind-core with anymind-components

<a name="Feb 9, 2018"></a>
### v0.0.26 - Feb 9, 2018
Changed:
* CommunicatorService roomInvitationEvent now returns Session
* CommunicatorService authenticate now returns Session
* CommunicatorService disconnect now requires Session

<a name="Feb 2, 2018"></a>
### v0.0.26 - Feb 2, 2018
Changed:
* Update ratel-sdk-js to v0.5.14 to support getIncomingCalls

### v0.0.25 - Feb 2, 2018
Changed:
* CommunicatorModule: Remove LoggerModule import

<a name="Feb 2, 2018"></a>
### v0.0.24 - Feb 2, 2018
Changed:
* CommunicatorModule: Remove ApiModule import

<a name="Feb 1, 2018"></a>
### v0.0.23 - Feb 1, 2018
Changed:
* CommunicatorService: CallInvitation now returns session

<a name="Feb 1, 2018"></a>
### v0.0.22 - Feb 1, 2018
Added:
* LoggerFactory which creates LoggerService using log prefix

<a name="Feb 1, 2018"></a>
### v0.0.21 - Feb 1, 2018
Added:
* LoggerModule with LogLevel
Changed:
* LoggerService is now injectable and requires LoggerModule
* Rename Connected to IConnected (linter)
* Update @anymind-ng/api to 0.0.16

<a name="Jan 29, 2018"></a>
### v0.0.20 - Jan 29, 2018
Fixed:
* Communicator Reconnecting - updated ratel-sdk-js to v0.5.13 

<a name="Jan 26, 2018"></a>
### v0.0.17 - Jan 26, 2018
Added:
* CommunicatorReconnectionService with automatic reconnection support
* CommunicatorSessionService to store the session and deviceId
* connectionEstablishedEvent$ now returns session and deviceId
* Bunch of loggers in CommunicatorService

Breaking changes:
* CommunicatorService events names
* CommunicatorService events now return Observable
* Move DeviceId and Session from CommunicatorService to CommunicatorSessionService 
* Logger -> LoggerService

Updated:
* ratel-sdk-js to 0.5.12

<a name="Jan 19, 2018"></a>
### Jan 19, 2018
* Create library with CommunicatorModule
