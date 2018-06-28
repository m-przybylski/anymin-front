// tslint:disable:readonly-array
import { MoneyDto, GetTag, GetProfile, GetService } from 'profitelo-api-ng/model/models';

export interface IClientCallSummary {
  serviceUsageEventId: string;
  cost: MoneyDto;
  tags: {
    serviceId: string,
    tags: GetTag[]
  };
  isRecommendable: boolean;
  companyExpertProfile: GetProfile;
  serviceOwnerProfile: GetProfile;
  callDuration: number;
  service: GetService;
}
