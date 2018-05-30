/* tslint:disable */
import {
  ProfileTestChoice
} from '../index';

declare var Object: any;
export interface ProfileTestInterface {
  "isActive"?: any;
  "orderId"?: any;
  "question"?: any;
  "id"?: any;
  profileTestChoices?: ProfileTestChoice[];
}

export class ProfileTest implements ProfileTestInterface {
  "isActive": any;
  "orderId": any;
  "question": any;
  "id": any;
  profileTestChoices: ProfileTestChoice[];
  constructor(data?: ProfileTestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProfileTest`.
   */
  public static getModelName() {
    return "ProfileTest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProfileTest for dynamic purposes.
  **/
  public static factory(data: ProfileTestInterface): ProfileTest{
    return new ProfileTest(data);
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
      name: 'ProfileTest',
      plural: 'ProfileTests',
      properties: {
        "isActive": {
          name: 'isActive',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
        "question": {
          name: 'question',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        profileTestChoices: {
          name: 'profileTestChoices',
          type: 'ProfileTestChoice[]',
          model: 'ProfileTestChoice'
        },
      }
    }
  }
}
