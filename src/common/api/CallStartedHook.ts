namespace profitelo.api {


  export interface CallStartedHook {
      expertId: string;
      clientId: string;
      serviceId: string;
      timestamp: number;
      callId: string;
  }

}
