namespace profitelo.api {


  export interface ServiceUsageEvent {
      freeSeconds: number;
      ratelCallId: string;
      clientId: string;
      id?: string;
      persisted?: boolean;
      serviceId: string;
      clientFinancialOperationId?: string;
      createdAt: Date;
      startedAt?: Date;
      ratePerMinute: MoneyDto;
      stoppedAt?: Date;
      expertId: string;
      expertFinancialOperationId?: string;
      callSignificant?: boolean;
  }

}
