import { MoneyDto, GetService } from 'profitelo-api-ng/model/models';

interface IAccountSettings {
  nickname?: string;
  avatar?: string;
  clientId: string;
}

export interface IExpertCallSummary {
  sueId: string;
  profit: MoneyDto;
  callDuration: number;
  service: GetService;
  clientAccountDetails?: IAccountSettings;
}
