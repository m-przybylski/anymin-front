namespace profitelo.components.braintreeForm {

  import IPaymentsApi = profitelo.api.IPaymentsApi
  import ClientToken = profitelo.api.ClientToken
  import JValue = profitelo.api.JValue
  export interface IBraintreeFormComponentBindings {
    onBraintreeFormLoad: () => void,
    submitButtonTranslate: string,
    onFormSucceed: (response: ng.IPromise<JValue>) => void
  }

  export class BraintreeFormComponentController implements ng.IController, IBraintreeFormComponentBindings {

    public onBraintreeFormLoad: () => void
    public isInvalid: boolean = false
    public submitButtonTranslate: string
    public onFormSucceed: (response: ng.IPromise<JValue>) => void
    public showCardLimitForm: boolean = false
    public defaultCardLimit: string = ''

    /* @ngInject */
    constructor(private PaymentsApi: IPaymentsApi, private User: any) {
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
                'font-size': '14px',
                'font-family': 'helvetica, tahoma, calibri, sans-serif',
                'color': '#808080'
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
                placeholder: '123'
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
                } else {
                  this.isInvalid = false
                  this.PaymentsApi.addPaymentMethodRoute({
                    nonce: payload.nonce,
                    isDefault: false,
                    limit: {
                      currency: this.User.getData('account').currency,
                       amount: Number(this.defaultCardLimit)
                    }
                  }).then(this.onAddPaymentMethod, this.onAddPaymentMethodError)
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
  }

  class BraintreeFormComponent implements ng.IComponentOptions {

    controller: ng.Injectable<ng.IControllerConstructor> = BraintreeFormComponentController
    templateUrl: string = 'components/braintree-form/braintree-form.tpl.html'
    bindings: {[boundProperty: string]: string} = {
      onBraintreeFormLoad: '<',
      onFormSucceed: '<',
      submitButtonTranslate: '@'
    }
  }

  angular.module('profitelo.components.braintree-form', [
    'pascalprecht.translate',
    'ngSanitize',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-input',
    'profitelo.components.dashboard.charge-account.summary-charge-account'
  ])
  .component('braintreeForm', new BraintreeFormComponent())
}
