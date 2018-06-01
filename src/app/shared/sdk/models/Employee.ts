/* tslint:disable */
import {
  Company,
  EmployeeProfileHistory,
  CompetenceSet,
  Competence,
  EmployeeCompetence,
  EmployeeCompetenceTarget,
  EmployeeTask
} from '../index';

declare var Object: any;
export interface EmployeeInterface {
  "name"?: string;
  "division"?: string;
  "position"?: string;
  "sex"?: string;
  "dob"?: Date;
  "joinDate"?: Date;
  "doProfileTest"?: boolean;
  "doEvaluateCompetence"?: boolean;
  "overallRate"?: number;
  "roleId": number;
  "realm"?: string;
  "username"?: string;
  "password": string;
  "challenges"?: any;
  "email": string;
  "emailVerified"?: boolean;
  "verificationToken"?: string;
  "status"?: string;
  "created"?: Date;
  "lastUpdated"?: Date;
  "id"?: number;
  "companyId"?: number;
  "competenceSetId"?: number;
  accessTokens?: any[];
  adminOf?: Company;
  company?: Company;
  employeeProfileHistories?: EmployeeProfileHistory[];
  competenceSet?: CompetenceSet;
  competences?: Competence[];
  employeeCompetence?: EmployeeCompetence[];
  employeeCompetenceTarget?: EmployeeCompetenceTarget[];
  employeeTasks?: EmployeeTask[];
  assignedBy?: EmployeeTask[];
  team?: any[];
  supervisor?: any[];
}

export class Employee implements EmployeeInterface {
  "name": string;
  "division": string;
  "position": string;
  "sex": string;
  "dob": Date;
  "joinDate": Date;
  "doProfileTest": boolean;
  "doEvaluateCompetence": boolean;
  "overallRate": number;
  "roleId": number;
  "realm": string;
  "username": string;
  "password": string;
  "challenges": any;
  "email": string;
  "emailVerified": boolean;
  "verificationToken": string;
  "status": string;
  "created": Date;
  "lastUpdated": Date;
  "id": number;
  "companyId": number;
  "competenceSetId": number;
  accessTokens: any[];
  adminOf: Company;
  company: Company;
  employeeProfileHistories: EmployeeProfileHistory[];
  competenceSet: CompetenceSet;
  competences: Competence[];
  employeeCompetence: EmployeeCompetence[];
  employeeCompetenceTarget: EmployeeCompetenceTarget[];
  employeeTasks: EmployeeTask[];
  assignedBy: EmployeeTask[];
  team: any[];
  supervisor: any[];
  constructor(data?: EmployeeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Employee`.
   */
  public static getModelName() {
    return "Employee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Employee for dynamic purposes.
  **/
  public static factory(data: EmployeeInterface): Employee{
    return new Employee(data);
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
      name: 'Employee',
      plural: 'employees',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "division": {
          name: 'division',
          type: 'string'
        },
        "position": {
          name: 'position',
          type: 'string'
        },
        "sex": {
          name: 'sex',
          type: 'string'
        },
        "dob": {
          name: 'dob',
          type: 'Date'
        },
        "joinDate": {
          name: 'joinDate',
          type: 'Date'
        },
        "doProfileTest": {
          name: 'doProfileTest',
          type: 'boolean'
        },
        "doEvaluateCompetence": {
          name: 'doEvaluateCompetence',
          type: 'boolean'
        },
        "overallRate": {
          name: 'overallRate',
          type: 'number'
        },
        "roleId": {
          name: 'roleId',
          type: 'number',
          default: 31
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "credentials": {
          name: 'credentials',
          type: 'any'
        },
        "challenges": {
          name: 'challenges',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "companyId": {
          name: 'companyId',
          type: 'number'
        },
        "competenceSetId": {
          name: 'competenceSetId',
          type: 'number'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        adminOf: {
          name: 'adminOf',
          type: 'Company',
          model: 'Company'
        },
        company: {
          name: 'company',
          type: 'Company',
          model: 'Company'
        },
        employeeProfileHistories: {
          name: 'employeeProfileHistories',
          type: 'EmployeeProfileHistory[]',
          model: 'EmployeeProfileHistory'
        },
        competenceSet: {
          name: 'competenceSet',
          type: 'CompetenceSet',
          model: 'CompetenceSet'
        },
        competences: {
          name: 'competences',
          type: 'Competence[]',
          model: 'Competence'
        },
        employeeCompetence: {
          name: 'employeeCompetence',
          type: 'EmployeeCompetence[]',
          model: 'EmployeeCompetence'
        },
        employeeCompetenceTarget: {
          name: 'employeeCompetenceTarget',
          type: 'EmployeeCompetenceTarget[]',
          model: 'EmployeeCompetenceTarget'
        },
        employeeTasks: {
          name: 'employeeTasks',
          type: 'EmployeeTask[]',
          model: 'EmployeeTask'
        },
        assignedBy: {
          name: 'assignedBy',
          type: 'EmployeeTask[]',
          model: 'EmployeeTask'
        },
        team: {
          name: 'team',
          type: 'any[]',
          model: ''
        },
        supervisor: {
          name: 'supervisor',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
