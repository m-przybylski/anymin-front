import { Injectable } from '@angular/core';

@Injectable()
export class ApiKeyService {

  private apiKeyValue?: string

  constructor() {
  }

  public setApiKey = (apiKey: string): void => {
    this.apiKeyValue = apiKey;
  }

  public unsetApiKey = (): void => {
    this.apiKeyValue = undefined;
  }

  public getApiKey = (): string | undefined =>
    this.apiKeyValue
}
