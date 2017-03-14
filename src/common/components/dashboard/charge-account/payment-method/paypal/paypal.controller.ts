import {IPayPalPaymentFormComponentBindings} from "./paypal"
import {PaymentsApi} from "profitelo-api-ng/api/api"
import {PostPayment, PaymentLink} from "profitelo-api-ng/model/models"
export class PayPalPaymentFormComponentController implements ng.IController, IPayPalPaymentFormComponentBindings {

  paymentCountryId: string
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: any
  postPayment: PostPayment

  $onInit = () => {
    this.postPayment = {
      amount: this.amountMethodModal.amountModel.cashAmount,
      paymentCountryId: this.paymentCountryId,
      paymentOption: this.amountMethodModal.amountModel.amount,
      paymentSystemId: this.amountMethodModal.paymentSystemModel.id
    }
  }

  /* @ngInject */
  constructor(private paypalFactory: any, private PaymentsApi: PaymentsApi,
              $state: ng.ui.IStateService) {

    this.paypalFactory.Button.render({

      env: 'sandbox', // TODO Set on Production ENV

      client: {
        sandbox: 'ARU8QOIuyKuT98aQLylIc8Pf25kp430ZZxAGVDOXZvBIKaS6oiGcp7SM52bx-SepsUrO8umNt7Obw6u4',
        production: 'xxxxxxxxx' // TODO Set on Production ENV
      },

      style: {
        size: 'small',
        color: 'silver',
        shape: 'pill'
      },

      payment: (resolve: any) => {

        this.PaymentsApi.createPaymentPathRoute({
          description: '',
          cancelUrl: 'http://localhost:4242/dashboard/charge-account',
          returnUrl: 'http://localhost:4242/dashboard/client/activities',
          postPayment: {
            amount: this.amountMethodModal.amountModel.cashAmount,
            paymentCountryId: this.paymentCountryId,
            paymentOption: this.amountMethodModal.amountModel.amount,
            paymentSystemId: this.amountMethodModal.paymentSystemModel.id
          }
        }).then((response: any) => {
          resolve(response.paymentId)
        }, (error: any) => {
          throw new Error(error)
        })
      },

      onAuthorize: (data: any, _actions: any) => {
        this.PaymentsApi.executePaymentPathRoute({
          paymentId: data.paymentID,
          payerId: data.payerID
        }).then((_response: any) => {
          $state.go('app.dashboard.client.activities')
        }, (error: any) => {
          throw new Error(error)
        })
      }

    }, '#paypal-button')
  }
}
