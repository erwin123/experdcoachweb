/* tslint:disable */
import {
  Employee,
  Competence
} from '../index';

declare var Object: any;
export interface CompanyInterface {
  "name"?: any;
  "accountLimit"?: any;
  "id"?: any;
  "adminId"?: any;
  admin?: Employee;
  employees?: Employee[];
  competences?: Competence[];
}

export class Company implements CompanyInterface {
  "name": any;
  "accountLimit": any;
  "id": any;
  "adminId": any;
  admin: Employee;
  employees: Employee[];
  competences: Competence[];
  constructor(data?: CompanyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Company`.
   */
  public static getModelName() {
    return "Company";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Company for dynamic purposes.
  **/
  public static factory(data: CompanyInterface): Company{
    return new Company(data);
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
      name: 'Company',
      plural: 'Companies',
      properties: {
        "name": {
          name: 'name',
          type: 'any'
        },
        "accountLimit": {
          name: 'accountLimit',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "adminId": {
          name: 'adminId',
          type: 'any'
        },
      },
      relations: {
        admin: {
          name: 'admin',
          type: 'Employee',
          model: 'Employee'
        },
        employees: {
          name: 'employees',
          type: 'Employee[]',
          model: 'Employee'
        },
        competences: {
          name: 'competences',
          type: 'Competence[]',
          model: 'Competence'
        },
      }
    }
  }
}
