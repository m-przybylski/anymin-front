namespace profitelo.api {


  export interface FileInfo {
      isUploaded: boolean;
      downloadUrl?: string;
      id?: string;
      contentType: string;
      persisted?: boolean;
      previews: Array<string>;
      createdAt: Date;
      name?: string;
      collectionType: string /*FileInfo.CollectionTypeEnum*/;
      status: string /*FileInfo.StatusEnum*/;
      token: string;
      accountId: string;
      size?: number;
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
