namespace profitelo.api {


  export interface PutService {
      invitations: Array<ServiceInvitation>;
      ownerEmployee?: boolean;
      details: PostServiceDetails;
  }

}
