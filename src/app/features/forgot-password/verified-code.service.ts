export class VerifiedCodeService {

  private verifiedCode?: string;

  constructor() {
  }

  public setVerifiedCode = (token: string): void => {
    this.verifiedCode = token;
  }

  public getVerifiedCode = (): string | undefined => this.verifiedCode;

  public unsetVerifiedCode = (): void => this.verifiedCode = void 0;
}
