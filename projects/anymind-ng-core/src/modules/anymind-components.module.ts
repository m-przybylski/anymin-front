import { NgModule } from '@angular/core';
import { InputPasswordComponent } from '../components/interface/inputs/input-password/input-password.component';
import { InputPhoneNumberComponent } from '../components/interface/inputs/input-phone-number/input-phone-number.component';
import { InputPinCodeComponent } from '../components/interface/inputs/input-pin-code/input-pin-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationAlertComponent } from '../components/interface/alerts/validation-alert/validation-alert.component';
import { InputCheckboxComponent } from '../components/interface/inputs/input-checkbox/input-checkbox.component';
import { InputEmailComponent } from '../components/interface/inputs/input-email/input-email.component';
import { AlertContainerComponent } from '../components/interface/alerts/alert-container/alert-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputPrefixComponent } from '../components/interface/inputs/input-prefix/input-prefix.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../components/interface/loaders/loader/loader.component';
import { SubmitButtonComponent } from '../components/interface/buttons/submit-button/submit-button.component';
import { TooltipComponent } from '../components/interface/tooltip/tooltip.component';
import { InputRechargeAccountComponent } from '../components/interface/inputs/input-recharge-account/input-recharge-account.component';
import { InputTextComponent } from '../components/interface/inputs/input-text/input-text.component';
import { InputPriceWithButtonComponent } from '../components/interface/inputs/input-price-with-button/input-price-with-button.component';
import { InputRadioComponent } from '../components/interface/inputs/input-radio/input-radio.component';
import { TextareaAutoHeightDirective } from '../shared/directive/textarea-auto-height/textarea-auto-height.directive';
import { TextareaPrimaryComponent } from '../components/interface/textareas/textarea-primary/textarea-primary.component';
import { AutofocusDirective } from '../shared/directive/auto-focus/autoFocus.directive';
import { NgxMaskModule } from 'ngx-mask';
import { ImageDisplayComponent } from '../components/interface/image-display/image-display.component';
import { ContentDefaultComponent } from '../components/interface/content-default/content-default.component';
import { CustomInputNumericComponent } from '../components/interface/inputs/custom-input-numeric/custom-input-numeric.component';
import { PreloaderComponent } from '../components/interface/preloader/preloader.component';
import { TooltipDirective } from '../components/interface/tooltip/tooltip.directive';
import { CallConnectedAlertComponent } from '../components/communicator/alerts/call-connected-alert/call-connected-alert.component';
import { CallLimitAlertComponent } from '../components/communicator/alerts/call-limit-alert/call-limit-alert.component';
import { CallPendingAlertComponent } from '../components/communicator/alerts/call-pending-alert/call-pending-alert.component';
import { CallWarnAlertComponent } from '../components/communicator/alerts/call-warn-alert/call-warn-alert.component';
import { EqualizerComponent } from '../components/communicator/equalizer/equalizer.component';
import { MessengerComponent } from '../components/communicator/messenger/messenger.component';
import { MessengerMaximizedComponent } from '../components/communicator/messenger/maximized/maximized.component';
import { MessengerMinimizedComponent } from '../components/communicator/messenger/minimized/minimized.component';
import { MessengerInputComponent } from '../components/communicator/messenger/maximized/messenger-input/messenger-input.component';
import { GroupedMessagesComponent } from '../components/communicator/messenger/maximized/grouped-messages/grouped-messages.component';
import { NavigationComponent } from '../components/communicator/navigation/navigation.component';
import { NavigationDescriptionComponent } from '../components/communicator/navigation/components/navigation-description/navigation-description.component';
import { MessagePipe } from '../shared/pipes/message/message.pipe';
import { UserAvatarComponent } from '../components/interface/user-avatar/user-avatar.component';
import { SecondsToDateTime } from '../shared/pipes/seconds-to-date-time/seconds-to-date-time.pipe';
import { MoneyToAmount } from '../shared/pipes/money-to-amount/money-to-amount.pipe';
import { MoneyToCurrency } from '../shared/pipes/money-to-currency/money-to-currency.pipe';
import { MoneyToString } from '../shared/pipes/money-to-string/money-to-string.pipe';
import { InputPriceComponent } from '../components/interface/inputs/input-price/input-price.component';
import { InputCardNumberComponent } from '../components/interface/inputs/input-card-number/input-card-number.component';
import { CreditCardImageComponent } from '../components/interface/credit-card-image/credit-card-image.component';
import { MessageTypeDirective } from '../components/communicator/messenger/directives/message-type.directive';
import { ImageBrokenDirective } from '../directives/image-broken/image-broken';
import { FileUploaderDirective } from '../directives/file-uploader/file-uploader.directive';
import { InputPhoneEmailComponent } from '../components/interface/inputs/input-phone-email/input-phone-email.component';
import { InputSetPasswordComponent } from '../components/interface/inputs/input-set-password/input-set-password.component';

@NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgbModule, TranslateModule, NgxMaskModule.forRoot()],
  declarations: [
    AutofocusDirective,
    SubmitButtonComponent,
    LoaderComponent,
    InputPasswordComponent,
    InputPhoneEmailComponent,
    InputPhoneNumberComponent,
    InputPinCodeComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputEmailComponent,
    InputPrefixComponent,
    InputRechargeAccountComponent,
    InputPriceWithButtonComponent,
    InputTextComponent,
    InputPriceComponent,
    InputCardNumberComponent,
    InputSetPasswordComponent,
    CreditCardImageComponent,
    ValidationAlertComponent,
    AlertContainerComponent,
    TooltipComponent,
    TextareaAutoHeightDirective,
    TextareaPrimaryComponent,
    CustomInputNumericComponent,
    ContentDefaultComponent,
    ImageDisplayComponent,
    PreloaderComponent,
    TooltipDirective,
    CallConnectedAlertComponent,
    CallLimitAlertComponent,
    CallPendingAlertComponent,
    CallWarnAlertComponent,
    EqualizerComponent,
    MessengerComponent,
    MessengerMaximizedComponent,
    MessengerMinimizedComponent,
    MessengerInputComponent,
    GroupedMessagesComponent,
    NavigationComponent,
    NavigationDescriptionComponent,
    UserAvatarComponent,
    MessagePipe,
    SecondsToDateTime,
    MoneyToAmount,
    MoneyToCurrency,
    MoneyToString,
    MessageTypeDirective,
    ImageBrokenDirective,
    FileUploaderDirective,
  ],
  exports: [
    SubmitButtonComponent,
    LoaderComponent,
    InputPasswordComponent,
    InputPhoneEmailComponent,
    InputPhoneNumberComponent,
    InputPinCodeComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputEmailComponent,
    InputPrefixComponent,
    InputRechargeAccountComponent,
    InputPriceWithButtonComponent,
    InputTextComponent,
    InputPriceComponent,
    InputCardNumberComponent,
    InputSetPasswordComponent,
    CreditCardImageComponent,
    ValidationAlertComponent,
    AlertContainerComponent,
    TooltipComponent,
    TextareaPrimaryComponent,
    CustomInputNumericComponent,
    ContentDefaultComponent,
    ImageDisplayComponent,
    PreloaderComponent,
    TooltipDirective,
    CallConnectedAlertComponent,
    CallLimitAlertComponent,
    CallPendingAlertComponent,
    CallWarnAlertComponent,
    EqualizerComponent,
    MessengerComponent,
    MessengerMaximizedComponent,
    MessengerMinimizedComponent,
    MessengerInputComponent,
    GroupedMessagesComponent,
    NavigationComponent,
    NavigationDescriptionComponent,
    UserAvatarComponent,
    MessagePipe,
    SecondsToDateTime,
    MoneyToAmount,
    MoneyToCurrency,
    MoneyToString,
    MessageTypeDirective,
    ImageBrokenDirective,
    FileUploaderDirective,
  ],
})
export class AnymindComponentsModule {}
