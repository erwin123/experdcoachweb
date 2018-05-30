/* tslint:disable */
import {
  FileUploadError
} from '../index';

declare var Object: any;
export interface FileUploadInterface {
  "id"?: any;
  "date": any;
  "fileType": any;
  "status"?: any;
  errors?: FileUploadError[];
}

export class FileUpload implements FileUploadInterface {
  "id": any;
  "date": any;
  "fileType": any;
  "status": any;
  errors: FileUploadError[];
  constructor(data?: FileUploadInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FileUpload`.
   */
  public static getModelName() {
    return "FileUpload";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FileUpload for dynamic purposes.
  **/
  public static factory(data: FileUploadInterface): FileUpload{
    return new FileUpload(data);
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
      name: 'FileUpload',
      plural: 'file-uploads',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "date": {
          name: 'date',
          type: 'any'
        },
        "fileType": {
          name: 'fileType',
          type: 'any'
        },
        "status": {
          name: 'status',
          type: 'any'
        },
      },
      relations: {
        errors: {
          name: 'errors',
          type: 'FileUploadError[]',
          model: 'FileUploadError'
        },
      }
    }
  }
}
