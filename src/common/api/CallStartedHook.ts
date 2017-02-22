namespace profitelo.api {


  export interface CallStartedHook {
      timestamp: number;
      clientId: string;
      callId: string;
      expertId: string;
      serviceId: string;
  }

}
