/* tslint:disable */
import {
  Employee,
  Competence,
  EmployeeTaskSupervisor,
  EmployeeTaskDevelopment
} from '../index';

declare var Object: any;
export interface EmployeeTaskInterface {
  "divisionStamp"?: any;
  "competenceStamp"?: any;
  "Resume"?: any;
  "startDate"?: any;
  "endDate"?: any;
  "isDone"?: any;
  "Rating"?: any;
  "isReviewed"?: any;
  "isActive"?: any;
  "id"?: any;
  "employeeId"?: any;
  "competenceId"?: any;
  "assignedById"?: any;
  employee?: Employee;
  competence?: Competence;
  assignedBy?: Employee;
  employeeTaskSupervisor?: EmployeeTaskSupervisor;
  employeeTaskDevelopments?: EmployeeTaskDevelopment[];
}

export class EmployeeTask implements EmployeeTaskInterface {
  "divisionStamp": any;
  "competenceStamp": any;
  "Resume": any;
  "startDate": any;
  "endDate": any;
  "isDone": any;
  "Rating": any;
  "isReviewed": any;
  "isActive": any;
  "id": any;
  "employeeId": any;
  "competenceId": any;
  "assignedById": any;
  employee: Employee;
  competence: Competence;
  assignedBy: Employee;
  employeeTaskSupervisor: EmployeeTaskSupervisor;
  employeeTaskDevelopments: EmployeeTaskDevelopment[];
  constructor(data?: EmployeeTaskInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EmployeeTask`.
   */
  public static getModelName() {
    return "EmployeeTask";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EmployeeTask for dynamic purposes.
  **/
  public static factory(data: EmployeeTaskInterface): EmployeeTask{
    return new EmployeeTask(data);
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
      name: 'EmployeeTask',
      plural: 'EmployeeTasks',
      properties: {
        "divisionStamp": {
          name: 'divisionStamp',
          type: 'any'
        },
        "competenceStamp": {
          name: 'competenceStamp',
          type: 'any'
        },
        "Resume": {
          name: 'Resume',
          type: 'any'
        },
        "startDate": {
          name: 'startDate',
          type: 'any'
        },
        "endDate": {
          name: 'endDate',
          type: 'any'
        },
        "isDone": {
          name: 'isDone',
          type: 'any'
        },
        "Rating": {
          name: 'Rating',
          type: 'any'
        },
        "isReviewed": {
          name: 'isReviewed',
          type: 'any'
        },
        "isActive": {
          name: 'isActive',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "employeeId": {
          name: 'employeeId',
          type: 'any'
        },
        "competenceId": {
          name: 'competenceId',
          type: 'any'
        },
        "assignedById": {
          name: 'assignedById',
          type: 'any'
        },
      },
      relations: {
        employee: {
          name: 'employee',
          type: 'Employee',
          model: 'Employee'
        },
        competence: {
          name: 'competence',
          type: 'Competence',
          model: 'Competence'
        },
        assignedBy: {
          name: 'assignedBy',
          type: 'Employee',
          model: 'Employee'
        },
        employeeTaskSupervisor: {
          name: 'employeeTaskSupervisor',
          type: 'EmployeeTaskSupervisor',
          model: 'EmployeeTaskSupervisor'
        },
        employeeTaskDevelopments: {
          name: 'employeeTaskDevelopments',
          type: 'EmployeeTaskDevelopment[]',
          model: 'EmployeeTaskDevelopment'
        },
      }
    }
  }
}
