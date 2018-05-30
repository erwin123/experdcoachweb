/* tslint:disable */
import {
  Competence,
  CompetenceSet
} from '../index';

declare var Object: any;
export interface CompetenceLevelInterface {
  "level"?: any;
  "description"?: any;
  "id"?: any;
  "competenceId"?: any;
  competence?: Competence;
  competenceSets?: CompetenceSet[];
}

export class CompetenceLevel implements CompetenceLevelInterface {
  "level": any;
  "description": any;
  "id": any;
  "competenceId": any;
  competence: Competence;
  competenceSets: CompetenceSet[];
  constructor(data?: CompetenceLevelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CompetenceLevel`.
   */
  public static getModelName() {
    return "CompetenceLevel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CompetenceLevel for dynamic purposes.
  **/
  public static factory(data: CompetenceLevelInterface): CompetenceLevel{
    return new CompetenceLevel(data);
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
      name: 'CompetenceLevel',
      plural: 'CompetenceLevels',
      properties: {
        "level": {
          name: 'level',
          type: 'any'
        },
        "description": {
          name: 'description',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "competenceId": {
          name: 'competenceId',
          type: 'any'
        },
      },
      relations: {
        competence: {
          name: 'competence',
          type: 'Competence',
          model: 'Competence'
        },
        competenceSets: {
          name: 'competenceSets',
          type: 'CompetenceSet[]',
          model: 'CompetenceSet'
        },
      }
    }
  }
}
