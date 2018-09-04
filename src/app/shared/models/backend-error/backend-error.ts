// tslint:disable:only-arrow-functions
// tslint:disable:no-any
export function isBackendError(err: any): err is BackendError {
  return err && typeof err === 'object' && typeof err.code === 'number' && typeof err.message === 'string';
}

export class BackendError {
  public readonly code: number;
  public readonly message: string;
}

export enum BackendErrors {
  BadAuthenticationCredentials = 101,
  IncorrectRequest = 107,
  NotAllowedToLogin = 108,
  IncorrectValidation = 200,
  NoSuchAccount = 300,
  CannotFindMsisdnToken = 322,
  CannotFindEmailToken = 323,
  CanNotFindMsisdnVerification = 330,
  PincodeSentTooRecently = 332,
  CreateAnotherPinCodeTokenRecently = 333,
  EmailAlreadyExists = 334,
  AccountAlreadyExists = 335,
  MsisdnVerificationTokenIncorrect = 343,
  TooManyMsisdnTokenAttempts = 344,
  ToManyIncorrectPasswordAttempts = 345,
  MsisdnBlocked = 346,
  MissingTokenModelId = 408,
  MissingPermissionForCreatingFreeConsultation = 479,
}
