namespace profitelo.api {


  export interface FileInfo {
      collectionType: string /*FileInfo.CollectionTypeEnum*/;
      name?: string;
      size?: number;
      downloadUrl?: string;
      accountId: string;
      persisted?: boolean;
      id?: string;
      contentType: string;
      status: string /*FileInfo.StatusEnum*/;
      token: string;
      createdAt: Date;
      previews: Array<string>;
      isUploaded: boolean;
  }


  export namespace FileInfo {
      export enum CollectionTypeEnum {
          COVER = <any> 'COVER',
          AVATAR = <any> 'AVATAR',
          DOCUMENT = <any> 'DOCUMENT',
          FILM = <any> 'FILM',
          GALLERY = <any> 'GALLERY'
      }
      export enum StatusEnum {
          NEW = <any> 'NEW',
          ACCEPTED = <any> 'ACCEPTED',
          REJECTED = <any> 'REJECTED'
      }
  }
}
