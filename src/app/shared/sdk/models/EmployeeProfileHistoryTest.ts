/* tslint:disable */

declare var Object: any;
export interface EmployeeProfileHistoryTestInterface {
  "profileStamp"?: any;
  "id"?: any;
}

export class EmployeeProfileHistoryTest implements EmployeeProfileHistoryTestInterface {
  "profileStamp": any;
  "id": any;
  constructor(data?: EmployeeProfileHistoryTestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeProfileHistoryTest`.
   */
  public static getModelName() {
    return "EmployeeProfileHistoryTest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeProfileHistoryTest for dynamic purposes.
  **/
  public static factory(data: EmployeeProfileHistoryTestInterface): EmployeeProfileHistoryTest{
    return new EmployeeProfileHistoryTest(data);
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
      name: 'EmployeeProfileHistoryTest',
      plural: 'EmployeeProfileHistoryTests',
      properties: {
        "profileStamp": {
          name: 'profileStamp',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
