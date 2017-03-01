namespace profitelo.api {


  export interface ServiceUsageEvent {
      expertFinancialOperationId?: string;
      clientId: string;
      stoppedAt?: Date;
      callSignificant?: boolean;
      persisted?: boolean;
      ratelCallId: string;
      freeSeconds: number;
      id?: string;
      createdAt: Date;
      startedAt?: Date;
      clientFinancialOperationId?: string;
      expertId: string;
      ratePerMinute: MoneyDto;
      serviceId: string;
  }

}
