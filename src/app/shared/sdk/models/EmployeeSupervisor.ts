/* tslint:disable */
import {
  Employee
} from '../index';

declare var Object: any;
export interface EmployeeSupervisorInterface {
  "id"?: any;
  "supervisorId"?: any;
  "employeeId"?: any;
  supervisor?: Employee;
  employee?: Employee;
}

export class EmployeeSupervisor implements EmployeeSupervisorInterface {
  "id": any;
  "supervisorId": any;
  "employeeId": any;
  supervisor: Employee;
  employee: Employee;
  constructor(data?: EmployeeSupervisorInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeSupervisor`.
   */
  public static getModelName() {
    return "EmployeeSupervisor";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeSupervisor for dynamic purposes.
  **/
  public static factory(data: EmployeeSupervisorInterface): EmployeeSupervisor{
    return new EmployeeSupervisor(data);
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
      name: 'EmployeeSupervisor',
      plural: 'EmployeeSupervisors',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "supervisorId": {
          name: 'supervisorId',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
      },
      relations: {
        supervisor: {
          name: 'supervisor',
          type: 'Employee',
          model: 'Employee'
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
