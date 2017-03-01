namespace profitelo.api {


  export interface UpdateAccount {
      deletedAt?: Date;
      status: AccountStatus;
      telcoPin: string;
      isBlocked: boolean;
      password: string;
  }

}
