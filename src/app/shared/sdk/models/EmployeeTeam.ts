/* tslint:disable */
import {
  Employee
} from '../index';

declare var Object: any;
export interface EmployeeTeamInterface {
  "id"?: any;
  "teamId"?: any;
  "employeeId"?: any;
  team?: Employee;
  employee?: Employee;
}

export class EmployeeTeam implements EmployeeTeamInterface {
  "id": any;
  "teamId": any;
  "employeeId": any;
  team: Employee;
  employee: Employee;
  constructor(data?: EmployeeTeamInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeTeam`.
   */
  public static getModelName() {
    return "EmployeeTeam";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeTeam for dynamic purposes.
  **/
  public static factory(data: EmployeeTeamInterface): EmployeeTeam{
    return new EmployeeTeam(data);
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
      name: 'EmployeeTeam',
      plural: 'EmployeeTeams',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "teamId": {
          name: 'teamId',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
      },
      relations: {
        team: {
          name: 'team',
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
