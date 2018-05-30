/* tslint:disable */

declare var Object: any;
export interface EmployeeCoachDataInterface {
  "doTask"?: any;
  "doEvaluateCompany"?: any;
  "id"?: any;
}

export class EmployeeCoachData implements EmployeeCoachDataInterface {
  "doTask": any;
  "doEvaluateCompany": any;
  "id": any;
  constructor(data?: EmployeeCoachDataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeCoachData`.
   */
  public static getModelName() {
    return "EmployeeCoachData";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeCoachData for dynamic purposes.
  **/
  public static factory(data: EmployeeCoachDataInterface): EmployeeCoachData{
    return new EmployeeCoachData(data);
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
      name: 'EmployeeCoachData',
      plural: 'EmployeeCoachData',
      properties: {
        "doTask": {
          name: 'doTask',
          type: 'any'
        },
        "doEvaluateCompany": {
          name: 'doEvaluateCompany',
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
