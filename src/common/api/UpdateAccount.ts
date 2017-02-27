namespace profitelo.api {


  export interface UpdateAccount {
      telcoPin: string;
      isBlocked: boolean;
      password: string;
      deletedAt?: Date;
      status: AccountStatus;
  }

}
