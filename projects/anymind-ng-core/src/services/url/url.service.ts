export class UrlService {
  public static resolveFileUrl(fileId: string): string {
    return `${window.location.origin}/files/${fileId}/download`;
  }
}
