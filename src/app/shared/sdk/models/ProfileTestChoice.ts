/* tslint:disable */
import {
  ProfileTest
} from '../index';

declare var Object: any;
export interface ProfileTestChoiceInterface {
  "choice"?: any;
  "isActive"?: any;
  "orderId"?: any;
  "id"?: any;
  "profileTestId"?: any;
  profileTest?: ProfileTest;
}

export class ProfileTestChoice implements ProfileTestChoiceInterface {
  "choice": any;
  "isActive": any;
  "orderId": any;
  "id": any;
  "profileTestId": any;
  profileTest: ProfileTest;
  constructor(data?: ProfileTestChoiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ProfileTestChoice`.
   */
  public static getModelName() {
    return "ProfileTestChoice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ProfileTestChoice for dynamic purposes.
  **/
  public static factory(data: ProfileTestChoiceInterface): ProfileTestChoice{
    return new ProfileTestChoice(data);
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
      name: 'ProfileTestChoice',
      plural: 'ProfileTestChoices',
      properties: {
        "choice": {
          name: 'choice',
          type: 'any'
        },
        "isActive": {
          name: 'isActive',
          type: 'any'
        },
        "orderId": {
          name: 'orderId',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "profileTestId": {
          name: 'profileTestId',
          type: 'any'
        },
      },
      relations: {
        profileTest: {
          name: 'profileTest',
          type: 'ProfileTest',
          model: 'ProfileTest'
        },
      }
    }
  }
}
