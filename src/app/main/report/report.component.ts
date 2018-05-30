import { Competence } from './../../shared/sdk/models/Competence';
import { EmployeeTask } from './../../shared/sdk/models/EmployeeTask';
import { Company } from './../../shared/sdk/models/Company';
import { EmployeeApi } from './../../shared/sdk/services/custom/Employee';
import { Employee } from './../../shared/sdk/models/Employee';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/subscription';
import { CompanyApi } from './../../shared/sdk/services/custom/Company';
import { CommunicationService } from './../../shared/services/communication.service';
import { TableCompanyDetail } from './../../shared/table-company-detail';
import { TableCompany } from './../../shared/table-company';
import { TableColumns } from './../../shared/table-columns';
import { Component, OnInit, Pipe } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public columns: Array<TableColumns>;
  public data: Array<TableCompanyDetail>;
  public sub: Subscription;
  public employees: Employee[];
  public company: Company;
  public orderASC = true;
  public orderBy = 'name';
  public companycompetences: Competence[] = [];
  public coachReport: any = {
    coaches: []
  };
  public totals: any = {
    finished: 0,
    ongoing: 0,
    teamCount: 0,
    created: 0
  };

  constructor(
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
    public employeeApi: EmployeeApi
  ) { }

  ngOnInit() {

    this.columns = [{
      name: 'name',
      title: 'Name',
      classes: ['experd-color'],
      hasRouter: true
    }, {
      name: 'division',
      title: 'Division',
      classes: ['white']
    }, {
      name: 'position',
      title: 'Position',
      classes: ['white']
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
      name: 'taskCreate',
      title: 'Create Task',
      classes: ['white']
    }, {
      name: 'dob',
      title: 'Age',
      classes: ['white']
    }, {
      name: 'sex',
      title: 'Sex',
      classes: ['white']
    }, {
      name: 'coach',
      title: 'Coach',
      classes: ['experd-color']
    }, {
      name: 'overall',
      title: 'Overall Rate',
      classes: ['white']
    }];

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyApi
          .findById(+params['companyId'])
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

        this.companyApi
          .getCompetences(+params['companyId'])
          .subscribe(companycompetences => {
            this.companycompetences = companycompetences;
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
    this.employeeApi
      .find({
        order: this.orderBy.concat(' ', this.orderASC ? 'ASC' : 'DESC'),
        where: {
          companyId: this.company.id,
        },
        counts: 'team',
        include: [{
          relation: 'employeeProfileHistories',
          scope: {
            order: 'date DESC',
            limit: 1,
            include: 'profile'
          }
        }, {
          relation: 'team',
          scope: {
            counts: 'team',
            include: [{
              relation: 'employeeProfileHistories',
              scope: {
                order: 'date DESC',
                limit: 1,
                include: 'profile'
              }
            }, {
              relation: 'employeeTasks',
              scope: {
                include: ['employeeTaskDevelopments', 'assignedBy', 'competence', 'employeeTaskSupervisor']
              }
            }, 'competences', 'employeeCompetence']
          }
        }, 'employeeTasks', 'supervisor']
      })
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
        for (const employee of employees) {
          for (const task of employee['employeeTasks']) {
            if (task.isDone) {
              ++this.totals.finished;
            } else {
              ++this.totals.ongoing;
            }
          }
          this.totals.teamCount = this.totals.teamCount + employee['teamCount'];
          if (employee['teamCount'] > 0) {
            this.coachReport.coaches.push(employee);
          }
        }
      });
  }

  sortBy(item) {
    if (item.name === this.orderBy) {
      this.orderASC = !this.orderASC;
    } else {
      this.orderBy = item.name;
      this.orderASC = true;
    }
    this.getEmployees();
  }

  getTasks(showFinished: boolean, tasks: Array<EmployeeTask>) {
    if (showFinished) {
      return tasks.filter(value => value.isDone).length;
    } else {
      return tasks.filter(value => !value.isDone).length;
    }
  }

  public numberFormatter(number) {
    return number === 0 ? '-' : number;
  }

  getEmployeePeriod(joindate: Date = new Date()) {

    const date1 = new Date();
    const date2 = new Date(joindate);


    const diff = Math.floor(date1.getTime() - date2.getTime());
    let secs = Math.floor(diff / 1000);
    let mins = Math.floor(secs / 60);
    let hours = Math.floor(mins / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 31);
    const years = Math.floor(months / 12);
    months = Math.floor(months % 12);
    days = Math.floor(days % 31);
    hours = Math.floor(hours % 24);
    mins = Math.floor(mins % 60);
    secs = Math.floor(secs % 60);
    let message = '';

    message += years + ' years/ ';
    message += months + ' months/ ';
    message += days + ' days';

    return message;

  }

  getCompleted(competence: Competence, employeeCompetence) {
    const value = employeeCompetence.find(empComp => empComp.competenceId === competence.id);
    return value ? value.value : 0;
  }

}
