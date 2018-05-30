/* tslint:disable */

declare var Object: any;
export interface RoleHierarchyInterface {
  "id"?: number;
  "roleId": number;
  "childId": number;
}

export class RoleHierarchy implements RoleHierarchyInterface {
  "id": number;
  "roleId": number;
  "childId": number;
  constructor(data?: RoleHierarchyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoleHierarchy`.
   */
  public static getModelName() {
    return "RoleHierarchy";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoleHierarchy for dynamic purposes.
  **/
  public static factory(data: RoleHierarchyInterface): RoleHierarchy{
    return new RoleHierarchy(data);
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
      name: 'RoleHierarchy',
      plural: 'RoleHierarchies',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "roleId": {
          name: 'roleId',
          type: 'number'
        },
        "childId": {
          name: 'childId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
