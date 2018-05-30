/* tslint:disable */
import {
  FileUpload
} from '../index';

declare var Object: any;
export interface FileUploadErrorInterface {
  "line"?: any;
  "message": any;
  "id"?: any;
  "fileUploadId"?: any;
  fileUpload?: FileUpload;
}

export class FileUploadError implements FileUploadErrorInterface {
  "line": any;
  "message": any;
  "id": any;
  "fileUploadId": any;
  fileUpload: FileUpload;
  constructor(data?: FileUploadErrorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FileUploadError`.
   */
  public static getModelName() {
    return "FileUploadError";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FileUploadError for dynamic purposes.
  **/
  public static factory(data: FileUploadErrorInterface): FileUploadError{
    return new FileUploadError(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'FileUploadError',
      plural: 'FileUploadErrors',
      properties: {
        "line": {
          name: 'line',
          type: 'any'
        },
        "message": {
          name: 'message',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "fileUploadId": {
          name: 'fileUploadId',
          type: 'any'
        },
      },
      relations: {
        fileUpload: {
          name: 'fileUpload',
          type: 'FileUpload',
          model: 'FileUpload'
        },
      }
    }
  }
}
