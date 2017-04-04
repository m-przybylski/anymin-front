import * as angular from 'angular'
import apiModule from 'profitelo-api-ng/api.module'
import {PaymentsApi} from 'profitelo-api-ng/api/api'
import {JValue, ClientToken} from 'profitelo-api-ng/model/models'
import {UserService} from '../../services/user/user.service'
import {CommonSettingsService} from '../../services/common-settings/common-settings.service'
import userModule from '../../services/user/user'
import {ITransaction} from '../dashboard/charge-account/payment-method/card/card'
import 'angular-sanitize'
import filtersModule from '../../filters/filters'
import commonSettingsModule from '../../services/common-settings/common-settings'
import '../../directives/interface/pro-checkbox/pro-checkbox'
import '../../directives/interface/pro-input/pro-input'
import '../../components/dashboard/charge-account/summary-charge-account/summary-charge-account'
import * as braintree from 'braintree-web'

export interface IBraintreeFormComponentBindings {
  onBraintreeFormLoad: () => void,
  submitButtonTranslate: string,
  onFormSucceed: (response: ng.IPromise<JValue>) => void,
  transaction?: ITransaction
}

export class BraintreeFormComponentController implements ng.IController, IBraintreeFormComponentBindings {

  public onBraintreeFormLoad: () => void
  public isInvalid: boolean = false
  public submitButtonTranslate: string
  public onFormSucceed: (response: ng.IPromise<JValue>) => void
  public showCardLimitForm: boolean = false
  public defaultCardLimit: string = ''
  public transaction: ITransaction

  /* @ngInject */
  constructor(private PaymentsApi: PaymentsApi, private userService: UserService,
              private CommonSettingsService: CommonSettingsService) {
    this.PaymentsApi.getClientTokenRoute().then(this.createBrainTree, this.onGetTokenError)
  }

  private onGetTokenError = (err: any) => {
    throw new Error('Can not get token: ' + err)
  }

  private createBrainTree = (tokenObject: ClientToken): void => {
    if (!!tokenObject.token) {
      braintree.client.create({
        authorization: tokenObject.token
      }, (err, clientInstance) => {
        if (err) {
          throw new Error('Can not authorize braintree: ' + err)
        }

        braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            'input': {
              'color': '#272727',
              'font-size': '16px',
              'font-family': 'Roboto, helvetica, tahoma, calibri, sans-serif',
              'font-weight': '300'
            },
            '::-webkit-input-placeholder': {
              'color': '#bfbfbf',
              'opacity': '1'
            },
            ':-moz-placeholder': {
              'color': '#bfbfbf',
              'opacity': '1'
            },
            '::-moz-placeholder': {
              'color': '#bfbfbf',
              'opacity': '1'
            },
            ':-ms-input-placeholder': {
              'color': '#bfbfbf',
              'opacity': '1'
            },
            ':focus': {
              'color': '#272727'
            },
            '.valid': {
              'color': '#8bdda8'
            },
            '.invalid': {
              'color': '#f35752'
            },
            'label': {
              'background': '#68bf7b'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111',
            },
            cvv: {
              selector: '#cvv',
              placeholder: '000'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: '10/2019'
            }
          }
        }, (err, hostedFieldsInstance) => {
          if (err) {
            throw new Error('Can not create braintree fields: ' + err)
          } else {
            this.onBraintreeFormLoad()
          }

          hostedFieldsInstance.on('validityChange', (event: any) => {
            const field = event.fields[event.emittedBy]

            if (field.isValid) {
              if (event.emittedBy === 'expirationDate' || event.emittedBy === 'cvv' || event.emittedBy === 'number') {
                if (event.fields.number.isValid && event.fields.cvv.isValid && event.fields.expirationDate.isValid) {
                  angular.element('#submit-braintree-form').removeAttr('disabled')
                }
              }
              // Apply styling for a valid field
              angular.element(field.container).parents('.form-group').addClass('has-success')
            } else if (field.isPotentiallyValid) {
              // Remove styling  from potentially valid fields
              angular.element(field.container).parents('.form-group').removeClass('has-warning')
              angular.element(field.container).parents('.form-group').removeClass('has-success')
            } else {
              // Add styling to invalid fields
              angular.element(field.container).parents('.form-group').addClass('has-warning')
            }
          })

          hostedFieldsInstance.on('cardTypeChange', (event: any) => {
            if (event.cards.length === 1) {
              angular.element('#card-type').text(event.cards[0].niceType)
            } else {
              angular.element('#card-type').text('')
            }
          })

          angular.element('.panel-body').submit((event) => {
            event.preventDefault()
            hostedFieldsInstance.tokenize((err: any, payload: any) => {
              if (err) {
                this.isInvalid = true
              } else if (this.transaction) {
                this.isInvalid = false
                this.PaymentsApi.createTransactionRoute({
                  nonce: payload.nonce,
                  payment: this.transaction
                }).then(this.onCreateTransaction, this.onCreateTransactionError)
              } else {
                this.isInvalid = false
                this.userService.getUser().then(user => {
                  this.PaymentsApi.addPaymentMethodRoute({
                    nonce: payload.nonce,
                    isDefault: false,
                    limit: {
                      currency: user.currency,
                      amount: Number(this.defaultCardLimit) * this.CommonSettingsService.localSettings.amountMultiplier
                    }
                  }).then(this.onAddPaymentMethod, this.onAddPaymentMethodError)
                })

              }
            })
          })
        })
      })
    }

  }

  private onAddPaymentMethod = (res: ng.IPromise<JValue>) => {
    this.onFormSucceed(res)
  }

  private onAddPaymentMethodError = (err: any) => {
    throw new Error('Can not send nonce: ' + err)
  }

  private onCreateTransaction = (res: ng.IPromise<JValue>) => {
    this.onFormSucceed(res)
  }

  private onCreateTransactionError = (err: any) => {
    throw new Error('Can not send nonce: ' + err)
  }
}

class BraintreeFormComponent implements ng.IComponentOptions {

  controller: ng.Injectable<ng.IControllerConstructor> = BraintreeFormComponentController
  template = require('./braintree-form.pug')()
  bindings: {[boundProperty: string]: string} = {
    onBraintreeFormLoad: '<',
    onFormSucceed: '<',
    submitButtonTranslate: '@',
    transaction: '=?'
  }
}

angular.module('profitelo.components.braintree-form', [
  'pascalprecht.translate',
  'ngSanitize',
  filtersModule,
  commonSettingsModule,
  userModule,
  apiModule,
  'profitelo.directives.interface.pro-checkbox',
  'profitelo.directives.interface.pro-input',
  'profitelo.components.dashboard.charge-account.summary-charge-account'
])
  .component('braintreeForm', new BraintreeFormComponent())
