export function isBackendError(err: any): err is BackendError {
  return err && typeof err === 'object' && typeof err.code === 'number' && typeof err.message === 'string';
}

export class BackendError {
  public readonly code: number;
  public readonly message: string;
}

export enum BackendErrors {
  BadAuthenticationCredentials = 101,
  NotAllowedToLogin = 108,
  IncorrectValidation = 200,
  CannotFindMsisdnToken = 322,
  CannotFindEmailToken = 323,
  PincodeSentTooRecently = 332,
  CreateAnotherPinCodeTokenRecently = 333,
  MsisdnVerificationTokenIncorrect = 343,
  TooManyMsisdnTokenAttempts = 344,
  ToManyIncorrectPasswordAttempts = 345,
  MsisdnBlocked = 346
}
