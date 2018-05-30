/* tslint:disable */
import {
  Company,
  EmployeeProfileHistory,
  CompetenceSet,
  Competence,
  EmployeeCompetence,
  EmployeeTask
} from '../index';

declare var Object: any;
export interface EmployeeInterface {
  "name"?: any;
  "division"?: any;
  "position"?: any;
  "sex"?: any;
  "dob"?: any;
  "joinDate"?: any;
  "doProfileTest"?: any;
  "doEvaluateCompetence"?: any;
  "overallRate"?: any;
  "realm"?: any;
  "username"?: any;
  "password": any;
  "challenges"?: any;
  "email": any;
  "emailVerified"?: any;
  "verificationToken"?: any;
  "status"?: any;
  "created"?: any;
  "lastUpdated"?: any;
  "id"?: any;
  "companyId"?: any;
  "competenceSetId"?: any;
  accessTokens?: any[];
  adminOf?: Company;
  company?: Company;
  employeeProfileHistories?: EmployeeProfileHistory[];
  competenceSet?: CompetenceSet;
  competences?: Competence[];
  employeeCompetence?: EmployeeCompetence[];
  employeeCompetenceTarget?: EmployeeCompetence[];
  employeeTasks?: EmployeeTask[];
  assignedBy?: EmployeeTask[];
  team?: any[];
  supervisor?: any[];
}

export class Employee implements EmployeeInterface {
  "name": any;
  "division": any;
  "position": any;
  "sex": any;
  "dob": any;
  "joinDate": any;
  "doProfileTest": any;
  "doEvaluateCompetence": any;
  "overallRate": any;
  "realm": any;
  "username": any;
  "password": any;
  "challenges": any;
  "email": any;
  "emailVerified": any;
  "verificationToken": any;
  "status": any;
  "created": any;
  "lastUpdated": any;
  "id": any;
  "companyId": any;
  "competenceSetId": any;
  accessTokens: any[];
  adminOf: Company;
  company: Company;
  employeeProfileHistories: EmployeeProfileHistory[];
  competenceSet: CompetenceSet;
  competences: Competence[];
  employeeCompetence: EmployeeCompetence[];
  employeeCompetenceTarget: EmployeeCompetence[];
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
          type: 'any'
        },
        "division": {
          name: 'division',
          type: 'any'
        },
        "position": {
          name: 'position',
          type: 'any'
        },
        "sex": {
          name: 'sex',
          type: 'any'
        },
        "dob": {
          name: 'dob',
          type: 'any'
        },
        "joinDate": {
          name: 'joinDate',
          type: 'any'
        },
        "doProfileTest": {
          name: 'doProfileTest',
          type: 'any'
        },
        "doEvaluateCompetence": {
          name: 'doEvaluateCompetence',
          type: 'any'
        },
        "overallRate": {
          name: 'overallRate',
          type: 'any'
        },
        "realm": {
          name: 'realm',
          type: 'any'
        },
        "username": {
          name: 'username',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'any'
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
          type: 'any'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'any'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'any'
        },
        "status": {
          name: 'status',
          type: 'any'
        },
        "created": {
          name: 'created',
          type: 'any'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "companyId": {
          name: 'companyId',
          type: 'any'
        },
        "competenceSetId": {
          name: 'competenceSetId',
          type: 'any'
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
          type: 'EmployeeCompetence[]',
          model: 'EmployeeCompetence'
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
