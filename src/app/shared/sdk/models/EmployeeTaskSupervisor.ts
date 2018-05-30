/* tslint:disable */
import {
  EmployeeTask
} from '../index';

declare var Object: any;
export interface EmployeeTaskSupervisorInterface {
  "review"?: any;
  "rating"?: any;
  "id"?: any;
  "employeeTaskId"?: any;
  employeeTask?: EmployeeTask;
}

export class EmployeeTaskSupervisor implements EmployeeTaskSupervisorInterface {
  "review": any;
  "rating": any;
  "id": any;
  "employeeTaskId": any;
  employeeTask: EmployeeTask;
  constructor(data?: EmployeeTaskSupervisorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeTaskSupervisor`.
   */
  public static getModelName() {
    return "EmployeeTaskSupervisor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeTaskSupervisor for dynamic purposes.
  **/
  public static factory(data: EmployeeTaskSupervisorInterface): EmployeeTaskSupervisor{
    return new EmployeeTaskSupervisor(data);
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
      name: 'EmployeeTaskSupervisor',
      plural: 'EmployeeTaskSupervisors',
      properties: {
        "review": {
          name: 'review',
          type: 'any'
        },
        "rating": {
          name: 'rating',
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
