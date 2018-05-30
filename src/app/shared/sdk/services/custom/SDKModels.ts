/* tslint:disable */
import { Injectable } from '@angular/core';
import { Company } from '../../models/Company';
import { Employee } from '../../models/Employee';
import { RoleHierarchy } from '../../models/RoleHierarchy';
import { EmployeeCoachData } from '../../models/EmployeeCoachData';
import { Profile } from '../../models/Profile';
import { ProfileTest } from '../../models/ProfileTest';
import { ProfileTestChoice } from '../../models/ProfileTestChoice';
import { EmployeeProfileHistory } from '../../models/EmployeeProfileHistory';
import { EmployeeProfileHistoryTest } from '../../models/EmployeeProfileHistoryTest';
import { Competence } from '../../models/Competence';
import { CompetenceLevel } from '../../models/CompetenceLevel';
import { CompetenceSet } from '../../models/CompetenceSet';
import { CompetenceSetDetail } from '../../models/CompetenceSetDetail';
import { EmployeeCompetence } from '../../models/EmployeeCompetence';
import { EmployeeCompetenceTarget } from '../../models/EmployeeCompetenceTarget';
import { EmployeeTask } from '../../models/EmployeeTask';
import { EmployeeTaskSupervisor } from '../../models/EmployeeTaskSupervisor';
import { EmployeeTaskDevelopment } from '../../models/EmployeeTaskDevelopment';
import { Companycompetence } from '../../models/Companycompetence';
import { EmployeeTeam } from '../../models/EmployeeTeam';
import { EmployeeSupervisor } from '../../models/EmployeeSupervisor';
import { Container } from '../../models/Container';
import { FileUpload } from '../../models/FileUpload';
import { FileUploadError } from '../../models/FileUploadError';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  public models: Models = {
    Company: Company,
    Employee: Employee,
    RoleHierarchy: RoleHierarchy,
    EmployeeCoachData: EmployeeCoachData,
    Profile: Profile,
    ProfileTest: ProfileTest,
    ProfileTestChoice: ProfileTestChoice,
    EmployeeProfileHistory: EmployeeProfileHistory,
    EmployeeProfileHistoryTest: EmployeeProfileHistoryTest,
    Competence: Competence,
    CompetenceLevel: CompetenceLevel,
    CompetenceSet: CompetenceSet,
    CompetenceSetDetail: CompetenceSetDetail,
    EmployeeCompetence: EmployeeCompetence,
    EmployeeCompetenceTarget: EmployeeCompetenceTarget,
    EmployeeTask: EmployeeTask,
    EmployeeTaskSupervisor: EmployeeTaskSupervisor,
    EmployeeTaskDevelopment: EmployeeTaskDevelopment,
    Companycompetence: Companycompetence,
    EmployeeTeam: EmployeeTeam,
    EmployeeSupervisor: EmployeeSupervisor,
    Container: Container,
    FileUpload: FileUpload,
    FileUploadError: FileUploadError,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
