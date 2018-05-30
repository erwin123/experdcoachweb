/* tslint:disable */
import {
  CompetenceSet,
  CompetenceLevel
} from '../index';

declare var Object: any;
export interface CompetenceSetDetailInterface {
  "id"?: any;
  "competenceSetId"?: any;
  "competenceLevelId"?: any;
  competenceSet?: CompetenceSet;
  competenceLevel?: CompetenceLevel;
}

export class CompetenceSetDetail implements CompetenceSetDetailInterface {
  "id": any;
  "competenceSetId": any;
  "competenceLevelId": any;
  competenceSet: CompetenceSet;
  competenceLevel: CompetenceLevel;
  constructor(data?: CompetenceSetDetailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompetenceSetDetail`.
   */
  public static getModelName() {
    return "CompetenceSetDetail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompetenceSetDetail for dynamic purposes.
  **/
  public static factory(data: CompetenceSetDetailInterface): CompetenceSetDetail{
    return new CompetenceSetDetail(data);
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
      name: 'CompetenceSetDetail',
      plural: 'CompetenceSetDetails',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "competenceSetId": {
          name: 'competenceSetId',
          type: 'any'
        },
        "competenceLevelId": {
          name: 'competenceLevelId',
          type: 'any'
        },
      },
      relations: {
        competenceSet: {
          name: 'competenceSet',
          type: 'CompetenceSet',
          model: 'CompetenceSet'
        },
        competenceLevel: {
          name: 'competenceLevel',
          type: 'CompetenceLevel',
          model: 'CompetenceLevel'
        },
      }
    }
  }
}
