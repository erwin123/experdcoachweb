/* tslint:disable */
import {
  Employee,
  Profile
} from '../index';

declare var Object: any;
export interface EmployeeProfileHistoryInterface {
  "date"?: any;
  "profileStamp"?: any;
  "id"?: any;
  "employeeId"?: any;
  "profileId"?: any;
  employee?: Employee;
  profile?: Profile;
}

export class EmployeeProfileHistory implements EmployeeProfileHistoryInterface {
  "date": any;
  "profileStamp": any;
  "id": any;
  "employeeId": any;
  "profileId": any;
  employee: Employee;
  profile: Profile;
  constructor(data?: EmployeeProfileHistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeProfileHistory`.
   */
  public static getModelName() {
    return "EmployeeProfileHistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeProfileHistory for dynamic purposes.
  **/
  public static factory(data: EmployeeProfileHistoryInterface): EmployeeProfileHistory{
    return new EmployeeProfileHistory(data);
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
      name: 'EmployeeProfileHistory',
      plural: 'EmployeeProfileHistories',
      properties: {
        "date": {
          name: 'date',
          type: 'any'
        },
        "profileStamp": {
          name: 'profileStamp',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
        "profileId": {
          name: 'profileId',
          type: 'any'
        },
      },
      relations: {
        employee: {
          name: 'employee',
          type: 'Employee',
          model: 'Employee'
        },
        profile: {
          name: 'profile',
          type: 'Profile',
          model: 'Profile'
        },
      }
    }
  }
}
