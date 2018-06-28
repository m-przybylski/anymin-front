export enum FileCategoryEnum {
  AVATAR,
  EXPERT_FILE
}

interface IValidFileTypes {
  [key: number]: string[];
}

export class FileTypeChecker {

  private static readonly validFileTypes: IValidFileTypes = {
    [FileCategoryEnum.AVATAR]: ['image/png', 'image/jpeg'],
    [FileCategoryEnum.EXPERT_FILE]: ['application/pdf', 'image/png', 'image/jpeg']
  };

  constructor() {}

  public static isFileFormatValid = (file: File, fileCategoryEnum: FileCategoryEnum): boolean =>
    file && FileTypeChecker.validFileTypes[fileCategoryEnum].length > 0 &&
      FileTypeChecker.validFileTypes[fileCategoryEnum].indexOf(file.type) !== -1

}
