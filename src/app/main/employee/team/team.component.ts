import { EmployeeTask } from './../../../shared/sdk/models/EmployeeTask';
import { EmployeeTeam } from './../../../shared/sdk/models/EmployeeTeam';
import { EmployeeTeamApi } from './../../../shared/sdk/services/custom/EmployeeTeam';
import { Employee } from './../../../shared/sdk/models/Employee';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Subscription } from 'rxjs/subscription';
import { TableCompanyDetail } from './../../../shared/table-company-detail';
import { TableColumns } from './../../../shared/table-columns';
import { CommunicationService } from './../../../shared/services/communication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public columns: Array<TableColumns>;
  public data: Array<TableCompanyDetail>;
  public sub: Subscription;
  public employeeteams: EmployeeTeam[];
  public employeeId: number;
  public orderASC = true;
  public orderBy = 'name';

  constructor(
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
    public router: Router,
    public employeeteamApi: EmployeeTeamApi
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
      name: 'dob',
      title: 'Age',
      classes: ['white']
    }, {
      name: 'sex',
      title: 'Sex',
      classes: ['white']
    }, {
      name: 'joinDate',
      title: 'Date of Joining',
      classes: ['white']
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

    this.sub = this.route.parent.params.subscribe(params => {
      console.log(params);

      console.log('ketemu', params['companyId']);
      this.companyApi
        .findById(+params['companyId'])
        .subscribe(company => {
          this.employeeId = +params['employeeId'];
          this.getEmployees();


          // this.communicationService.announceMain({
          //   breadcrumbs: ['Home', 'Company', company.name],
          //   sidemenus: this.communicationService.menuSet('employee', company, params['employeeId'])
          // })
        });

    });

  }


  getEmployees() {

    this.employeeteamApi
      .find({
        where: {
          employeeId: this.employeeId,
        },
        include: {
          relation: 'team',
          scope: {
            order: this.orderBy.concat(' ', this.orderASC ? 'ASC' : 'DESC'),
            counts: 'team',
            include: [{
              relation: 'employeeProfileHistories',
              scope: {
                order: 'date DESC',
                limit: 1
              }
            }, 'employeeTasks']
          }
        }
      })
      .subscribe((result: EmployeeTeam[]) => {
        this.employeeteams = result;
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

  showTeam(team: Employee) {
    this.router.navigate([team.id], { relativeTo: this.route });
  }


  public numberFormatter(number) {
    return number === 0 ? '-' : number;
  }


}
