import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { ActivatedRoute } from '@angular/router';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CommunicationService } from './../../../shared/services/communication.service';
import { Company } from './../../../shared/sdk/models/Company';
import { Employee } from './../../../shared/sdk/models/Employee';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit, OnDestroy {

  public employee: Employee;
  public sub: Subscription;
  public companyId: number;
  public employeeId: number;
  public company: Company;
  public formTitle: String = 'Team Edit';

  constructor(
    public employeeApi: EmployeeApi,
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      this.companyId = +params['companyId']; // (+) converts string 'id' to a number
      this.employeeId = +params['employeeId']; // (+) converts string 'id' to a number

      this.companyApi
        .findById(this.companyId, { include: 'employees' })
        .subscribe((company: Company) => {
          this.company = company;
          this.getEmployee();
        });

    });
  }

  getEmployee() {
    this.employeeApi.findById(this.employeeId, {
      include: ['team', 'supervisor'],
      where: {
        companyId: this.companyId
      }
    })
      .subscribe((employee: Employee) => {
        this.employee = employee;
        this.communicationService.announceMain({
          breadcrumbs: [{
            label: 'Home',
            url: ['main']
          }, {
            label: 'Edit Company',
            url: ['main/company/list']
          }, {
            label: this.company.name,
            url: ['main/company', this.company.id]
          }, {
            label: 'View Team',
            url: ['main/company', this.company.id, 'employee', 'team']
          }, {
            label: employee.name,
            url: ['main/company', this.company.id, 'employee', 'team', employee.id]
          }],
          sidemenus: this.communicationService.menuSet('company', this.company)
        });
        console.log(employee);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateTeam(oldemployee: Employee, newemployee: Employee) {

    const obsArr = [];
    if (oldemployee.id) { obsArr.push(this.employeeApi.unlinkTeam(this.employee.id, oldemployee.id)); }
    if (oldemployee.id) { obsArr.push(this.employeeApi.unlinkSupervisor(oldemployee.id, this.employee.id)); }
    obsArr.push(this.employeeApi.linkTeam(this.employee.id, newemployee.id));
    obsArr.push(this.employeeApi.linkSupervisor(newemployee.id, this.employee.id));

    Observable.forkJoin(obsArr)
      .subscribe((res) => {
        console.log(res);
        this.getEmployee();
      });
  }

  deleteTeam(oldemployee: Employee) {

    const obsArr = [];
    obsArr.push(this.employeeApi.unlinkTeam(this.employee.id, oldemployee.id));
    obsArr.push(this.employeeApi.linkSupervisor(oldemployee.id, this.employee.id));

    Observable.forkJoin(obsArr)
      .subscribe((res) => {
        console.log(res);
        this.getEmployee();
      });
  }

  addTeam() {
    const newEmp = new Employee();
    newEmp.name = 'new Team Member';
    this.employee.team.push(newEmp);
  }

  updateSupervisor(oldemployee: Employee, newemployee: Employee) {

    const obsArr = [];
    if (oldemployee.id) { obsArr.push(this.employeeApi.unlinkSupervisor(this.employee.id, oldemployee.id)); }
    if (oldemployee.id) { obsArr.push(this.employeeApi.unlinkTeam(oldemployee.id, this.employee.id)); }
    obsArr.push(this.employeeApi.linkSupervisor(this.employee.id, newemployee.id));
    obsArr.push(this.employeeApi.linkTeam(newemployee.id, this.employee.id));

    Observable.forkJoin(obsArr)
      .subscribe((res) => {
        console.log(res);
        this.getEmployee();
      });
  }

  deleteSupervisor(oldemployee: Employee) {

    const obsArr = [];
    obsArr.push(this.employeeApi.unlinkSupervisor(this.employee.id, oldemployee.id));
    obsArr.push(this.employeeApi.unlinkTeam(oldemployee.id, this.employee.id));

    Observable.forkJoin(obsArr)
      .subscribe((res) => {
        console.log(res);
        this.getEmployee();
      });
  }

  addSupervisor() {
    const newEmp = new Employee();
    newEmp.name = 'new Supervisor Member';
    this.employee.supervisor.push(newEmp);
  }

  getEmployees() {

    let returnEmps = this.company.employees;

    returnEmps = returnEmps.filter(x => x.id !== this.employee.id);

    for (const item of this.employee.team) {
      returnEmps = returnEmps.filter(x => x.id !== item.id);
    }

    for (const item of this.employee.supervisor) {
      returnEmps = returnEmps.filter(x => x.id !== item.id);
    }

    return returnEmps;

  }



}
