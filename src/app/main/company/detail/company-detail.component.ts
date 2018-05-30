import { LoopBackConfig } from './../../../shared/sdk';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { EmployeeTask } from './../../../shared/sdk/models/EmployeeTask';
import { Company } from './../../../shared/sdk/models/Company';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Employee } from './../../../shared/sdk/models/Employee';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CommunicationService } from './../../../shared/services/communication.service';
import { TableCompanyDetail } from './../../../shared/table-company-detail';
import { TableCompany } from './../../../shared/table-company';
import { TableColumns } from './../../../shared/table-columns';
import { Component, OnInit, Pipe } from '@angular/core';
import * as FileSaver from 'file-saver';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})


export class CompanyDetailComponent implements OnInit {

  public columns: Array<TableColumns>;
  public data: Array<TableCompanyDetail>;
  public sub: Subscription;
  public employees: Employee[];
  public company: Company;
  public companyId: number;
  public orderASC = true;
  public orderBy = 'name';

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
    public employeeApi: EmployeeApi,
    public http: Http
  ) { }

  ngOnInit() {
    let currentRole = localStorage.getItem("myRole");
    this.columns = [{
      name: 'name',
      title: 'Name',
      classes: ['experd-color'],
      hasRouter: true,
      direction: "asc",
      sortAble: true
    }, {
      name: 'division',
      title: 'Division',
      classes: ['white'],
      direction: "",
      sortAble: true
    }, {
      name: 'position',
      title: 'Position',
      classes: ['white'],
      direction: "",
      sortAble: true
    }, {
      name: 'profile',
      title: 'Profile',
      classes: ['white']
    }, {
      name: 'taskOnGoing',
      title: 'Task On Going',
      classes: ['white']
    }, {
      name: 'taskFinish',
      title: 'Task Finish',
      classes: ['white']
    }, {
      name: 'teamCount',
      title: 'Team',
      classes: ['white']
    }, {
      name: 'dob',
      title: 'Age',
      classes: ['white'],
      direction: "",
      sortAble: true
    }, {
      name: 'sex',
      title: 'Sex',
      classes: ['white'],
      direction: "",
      sortAble: true
    }, {
      name: 'joinDate',
      title: 'Date of Joining',
      classes: ['white'],
      direction: "",
      sortAble: true
    }, {
      name: 'taskCreate',
      title: 'Create Task',
      classes: ['white']
    }, {
      name: 'competenceSubmission',
      title: 'Competence Submission Status',
      classes: ['white']
    }, {
      name: 'overall',
      title: 'Overall Rate',
      classes: ['white']
    }];

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        this.companyId = +params['companyId'];
        const URL = LoopBackConfig.getPath() + '/api/employees/upload?companyId=' + this.companyId + "&roleid="+currentRole;
        this.uploader = new FileUploader({ url: URL });
        console.log('ketemu', params['companyId']);
        this.companyApi
          .findById(+params['companyId'], {
            include: 'employees'
          })
          .subscribe((company: Company) => {

            this.company = company;
            this.getEmployees();

            this.communicationService.announceMain({
              breadcrumbs: [{
                label: 'Home',
                url: ['main']
              }, {
                label: 'Company',
                url: ['main/company/list']
              }, {
                label: company.name,
                url: ['main/company', company.id]
              }],
              sidemenus: this.communicationService.menuSet('company', company)
            });
          });
      } else {
        this.communicationService.announceMain({
          breadcrumbs: [{
            label: 'Home',
            url: ['main']
          }, {
            label: 'Company',
            url: ['main/company/list']
          }],
          sidemenus: this.communicationService.menuSet('company')
        });
      }
    });

  }

  getEmployees() {
    let roleHierarchy = JSON.parse(localStorage.getItem("hierarchy"));
    var roles:number[] = []
    roleHierarchy.forEach(element => {
      roles.push(element.childId);
    });
    this.employeeApi
      .find({
        order: this.orderBy.concat(' ', this.orderASC ? 'ASC' : 'DESC'),
        where: {
          and: [
            {
              companyId: this.company.id,
            }, {
              id: { neq: this.company.adminId }
            },
            {
              roleId: {inq: roles }
            }
          ]

        },
        counts: 'team',
        include: [{
          relation: 'employeeProfileHistories',
          scope: {
            order: 'date DESC',
            limit: 1
          }
        }, 'employeeTasks', 'assignedBy']
      })
      .subscribe((employees: Employee[]) => this.employees = employees);
  }

  sortBy(item: TableColumns) {
    if (item.name === this.orderBy) {
      this.orderASC = !this.orderASC;
    } else {
      this.orderBy = item.name;
      this.orderASC = true;
    }
    this.columns.forEach(x => {
      x.direction = "";
    });
    item.direction = this.orderASC ? "asc" : "desc";
    this.getEmployees();
  }

  getTasks(showFinished: boolean, tasks: Array<EmployeeTask>) {
    if (showFinished) {
      return tasks.filter(value => value.isDone).length;
    } else {
      return tasks.filter(value => !value.isDone).length;
    }
  }

  openReport() {
    window.open(LoopBackConfig.getPath() + '/api/reports/download?company=' + this.companyId, '_blank');
  }

  exportData() {

    this.http
      .get(LoopBackConfig.getPath() + '/api/employees/download?company=' + this.companyId,
        { responseType: ResponseContentType.Blob })
      .map((res: Response) => res.blob())
      .subscribe(
        data => {
          console.log(data);
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          console.log(blob);
          FileSaver.saveAs(blob, 'employee.xlsx');

        },
        err => console.error(err),
        () => console.log('done'));
  }

  importData() {

  }

  public numberFormatter(number) {
    return number === 0 ? '-' : number;
  }

}
