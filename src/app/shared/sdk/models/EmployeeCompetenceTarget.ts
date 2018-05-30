/* tslint:disable */
import {
  Competence,
  Employee
} from '../index';

declare var Object: any;
export interface EmployeeCompetenceTargetInterface {
  "target"?: any;
  "id"?: any;
  "competenceId"?: any;
  "employeeId"?: any;
  competence?: Competence;
  employee?: Employee;
}

export class EmployeeCompetenceTarget implements EmployeeCompetenceTargetInterface {
  "target": any;
  "id": any;
  "competenceId": any;
  "employeeId": any;
  competence: Competence;
  employee: Employee;
  constructor(data?: EmployeeCompetenceTargetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeCompetenceTarget`.
   */
  public static getModelName() {
    return "EmployeeCompetenceTarget";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeCompetenceTarget for dynamic purposes.
  **/
  public static factory(data: EmployeeCompetenceTargetInterface): EmployeeCompetenceTarget{
    return new EmployeeCompetenceTarget(data);
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
      name: 'EmployeeCompetenceTarget',
      plural: 'EmployeeCompetenceTargets',
      properties: {
        "target": {
          name: 'target',
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
