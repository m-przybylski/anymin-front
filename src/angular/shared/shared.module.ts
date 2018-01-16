import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  AccountApi, AdminpanelApi, ConfigApi, EmploymentApi, FilesApi, FinancesApi, InvitationApi, PaymentsApi, PayoutsApi,
  PresenceApi, ProfileApi, RatelApi, RecoverPasswordApi, RegistrationApi, SearchApi, ServiceApi, SessionApi, ViewsApi,
  WizardApi
} from 'profitelo-api-ng4/api/api'
import {EventsServiceProvider} from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import {CommunicatorService} from './services/communicator/communicator.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    AccountApi,
    AdminpanelApi,
    ConfigApi,
    EmploymentApi,
    FilesApi,
    FinancesApi,
    InvitationApi,
    PaymentsApi,
    PayoutsApi,
    PresenceApi,
    ProfileApi,
    RatelApi,
    RecoverPasswordApi,
    RegistrationApi,
    SearchApi,
    ServiceApi,
    SessionApi,
    ViewsApi,
    WizardApi,
    EventsServiceProvider,
    CommunicatorService
  ]
})

export class SharedModule {
}
