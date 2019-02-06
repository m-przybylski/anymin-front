export class UrlService {
  public static resolveFileUrl(fileId: string): string {
    // TODO replace with some global service
    // https://anymind.atlassian.net/browse/FRONT-169
    return `${window.location.origin}/files/${fileId}/download/preview`;
  }
}
