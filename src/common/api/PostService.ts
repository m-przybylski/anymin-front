namespace profitelo.api {


  export interface PostService {
      ownerEmployee?: boolean;
      invitations: Array<ServiceInvitation>;
      details: PostServiceDetails;
  }

}
