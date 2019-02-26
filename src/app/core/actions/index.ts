import * as AuthActions from './login.actions';
import * as SessionActions from './session.actions';
import * as NavbarActions from './navbar.actions';
import * as SessionUpdateApiActions from './create-update-page.api';
import * as SessionApiActions from './session-api.actions';
import * as RegisterActions from './register.actions';
import * as RegisterApiActions from './register-api.actions';
import * as ForgotPasswordActions from './forgot-password-api.actions';
import * as SetNewPasswordActions from './set-new-password.actions';
import * as VisibilityInitActions from './visibility/visibility-init.actions';
import * as VisibilityApiActions from './visibility/visibility-api.actions';
import * as VisibilityUiActions from './visibility/visibility-ui.actions';
import * as VisibilityWSActions from './visibility/visibility-ws.actions';
import * as InvitationsApiActions from './invitations/invitations-api-actions';
import * as InvitationsWsActions from './invitations/invitations-ws-actions';
import * as InvitationsActions from './invitations/invitations-actions';

// import * as ActivitiesActions from './activities.actions';
// import * as ActivitiesApiActions from './activities/activities-api.actions';
// import * as ActivitiesPageActions from './activities/activities-page.actions';
// import * as BalanceApiActions from './activities/balance-api.actions';
// import * as ActivitiesWsActions from './activities/activities-ws.actions';

export {
  AuthActions,
  SessionActions,
  NavbarActions,
  SessionUpdateApiActions,
  SessionApiActions,
  RegisterActions,
  RegisterApiActions,
  ForgotPasswordActions,
  SetNewPasswordActions,
};
export { InvitationsApiActions, InvitationsWsActions, InvitationsActions };
export { VisibilityInitActions, VisibilityApiActions, VisibilityUiActions, VisibilityWSActions };

// export { ActivitiesActions, ActivitiesApiActions, ActivitiesPageActions, BalanceApiActions, ActivitiesWsActions };
