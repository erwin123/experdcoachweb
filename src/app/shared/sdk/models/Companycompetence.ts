/* tslint:disable */
import {
  Company,
  Competence
} from '../index';

declare var Object: any;
export interface CompanycompetenceInterface {
  "id"?: any;
  "companyId"?: any;
  "competenceId"?: any;
  company?: Company;
  competence?: Competence;
}

export class Companycompetence implements CompanycompetenceInterface {
  "id": any;
  "companyId": any;
  "competenceId": any;
  company: Company;
  competence: Competence;
  constructor(data?: CompanycompetenceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Companycompetence`.
   */
  public static getModelName() {
    return "Companycompetence";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Companycompetence for dynamic purposes.
  **/
  public static factory(data: CompanycompetenceInterface): Companycompetence{
    return new Companycompetence(data);
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
      name: 'Companycompetence',
      plural: 'Companycompetences',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
        "competenceId": {
          name: 'competenceId',
          type: 'any'
        },
      },
      relations: {
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company'
        },
        competence: {
          name: 'competence',
          type: 'Competence',
          model: 'Competence'
        },
      }
    }
  }
}
