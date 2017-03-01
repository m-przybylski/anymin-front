namespace profitelo.api {


  export interface PostService {
      invitations: Array<ServiceInvitation>;
      ownerEmployee?: boolean;
      details: PostServiceDetails;
  }

}
