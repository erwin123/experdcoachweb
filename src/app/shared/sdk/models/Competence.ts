/* tslint:disable */
import {
  CompetenceLevel,
  Employee,
  Company
} from '../index';

declare var Object: any;
export interface CompetenceInterface {
  "name"?: any;
  "definition"?: any;
  "keybehaviour"?: any;
  "id"?: any;
  competenceLevels?: CompetenceLevel[];
  employees?: Employee[];
  companies?: Company[];
}

export class Competence implements CompetenceInterface {
  "name": any;
  "definition": any;
  "keybehaviour": any;
  "id": any;
  competenceLevels: CompetenceLevel[];
  employees: Employee[];
  companies: Company[];
  constructor(data?: CompetenceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Competence`.
   */
  public static getModelName() {
    return "Competence";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Competence for dynamic purposes.
  **/
  public static factory(data: CompetenceInterface): Competence{
    return new Competence(data);
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
      name: 'Competence',
      plural: 'Competences',
      properties: {
        "name": {
          name: 'name',
          type: 'any'
        },
        "definition": {
          name: 'definition',
          type: 'any'
        },
        "keybehaviour": {
          name: 'keybehaviour',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        competenceLevels: {
          name: 'competenceLevels',
          type: 'CompetenceLevel[]',
          model: 'CompetenceLevel'
        },
        employees: {
          name: 'employees',
          type: 'Employee[]',
          model: 'Employee'
        },
        companies: {
          name: 'companies',
          type: 'Company[]',
          model: 'Company'
        },
      }
    }
  }
}
