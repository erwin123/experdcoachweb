/* tslint:disable */
import {
  Competence,
  Employee
} from '../index';

declare var Object: any;
export interface EmployeeCompetenceInterface {
  "value"?: any;
  "id"?: any;
  "competenceId"?: any;
  "employeeId"?: any;
  competence?: Competence;
  employee?: Employee;
}

export class EmployeeCompetence implements EmployeeCompetenceInterface {
  "value": any;
  "id": any;
  "competenceId": any;
  "employeeId": any;
  competence: Competence;
  employee: Employee;
  constructor(data?: EmployeeCompetenceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeCompetence`.
   */
  public static getModelName() {
    return "EmployeeCompetence";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeCompetence for dynamic purposes.
  **/
  public static factory(data: EmployeeCompetenceInterface): EmployeeCompetence{
    return new EmployeeCompetence(data);
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
      name: 'EmployeeCompetence',
      plural: 'EmployeeCompetences',
      properties: {
        "value": {
          name: 'value',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "competenceId": {
          name: 'competenceId',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
      },
      relations: {
        competence: {
          name: 'competence',
          type: 'Competence',
          model: 'Competence'
        },
        employee: {
          name: 'employee',
          type: 'Employee',
          model: 'Employee'
        },
      }
    }
  }
}
