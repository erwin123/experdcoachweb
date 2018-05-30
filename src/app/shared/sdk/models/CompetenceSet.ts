/* tslint:disable */
import {
  Company,
  Employee,
  CompetenceLevel
} from '../index';

declare var Object: any;
export interface CompetenceSetInterface {
  "name"?: any;
  "id"?: any;
  "companyId"?: any;
  company?: Company;
  employees?: Employee[];
  competenceLevels?: CompetenceLevel[];
}

export class CompetenceSet implements CompetenceSetInterface {
  "name": any;
  "id": any;
  "companyId": any;
  company: Company;
  employees: Employee[];
  competenceLevels: CompetenceLevel[];
  constructor(data?: CompetenceSetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompetenceSet`.
   */
  public static getModelName() {
    return "CompetenceSet";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompetenceSet for dynamic purposes.
  **/
  public static factory(data: CompetenceSetInterface): CompetenceSet{
    return new CompetenceSet(data);
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
      name: 'CompetenceSet',
      plural: 'CompetenceSets',
      properties: {
        "name": {
          name: 'name',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
      },
      relations: {
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company'
        },
        employees: {
          name: 'employees',
          type: 'Employee[]',
          model: 'Employee'
        },
        competenceLevels: {
          name: 'competenceLevels',
          type: 'CompetenceLevel[]',
          model: 'CompetenceLevel'
        },
      }
    }
  }
}
