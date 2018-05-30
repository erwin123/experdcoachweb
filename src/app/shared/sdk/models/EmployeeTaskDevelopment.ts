/* tslint:disable */
import {
  EmployeeTask
} from '../index';

declare var Object: any;
export interface EmployeeTaskDevelopmentInterface {
  "description"?: any;
  "passed"?: any;
  "id"?: any;
  "employeeTaskId"?: any;
  employeeTask?: EmployeeTask;
}

export class EmployeeTaskDevelopment implements EmployeeTaskDevelopmentInterface {
  "description": any;
  "passed": any;
  "id": any;
  "employeeTaskId": any;
  employeeTask: EmployeeTask;
  constructor(data?: EmployeeTaskDevelopmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeTaskDevelopment`.
   */
  public static getModelName() {
    return "EmployeeTaskDevelopment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeTaskDevelopment for dynamic purposes.
  **/
  public static factory(data: EmployeeTaskDevelopmentInterface): EmployeeTaskDevelopment{
    return new EmployeeTaskDevelopment(data);
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
      name: 'EmployeeTaskDevelopment',
      plural: 'EmployeeTaskDevelopments',
      properties: {
        "description": {
          name: 'description',
          type: 'any'
        },
        "passed": {
          name: 'passed',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "employeeTaskId": {
          name: 'employeeTaskId',
          type: 'any'
        },
      },
      relations: {
        employeeTask: {
          name: 'employeeTask',
          type: 'EmployeeTask',
          model: 'EmployeeTask'
        },
      }
    }
  }
}
