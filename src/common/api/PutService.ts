namespace profitelo.api {


  export interface PutService {
      ownerEmployee?: boolean;
      invitations: Array<ServiceInvitation>;
      details: PostServiceDetails;
  }

}
