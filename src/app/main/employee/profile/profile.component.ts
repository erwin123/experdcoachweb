import { ActivatedRoute, Router } from '@angular/router';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Company } from './../../../shared/sdk/models/Company';
import { Subscription } from 'rxjs/subscription';
import { Employee } from './../../../shared/sdk/models/Employee';
import { CommunicationService } from './../../../shared/services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public employee: Employee = new Employee();
  public sub: Subscription;
  public companyId: number;
  public employeeId: number;
  public company: Company = new Company();
  public profile = '';

  constructor(
    public employeeApi: EmployeeApi,
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    this.sub = this.route.parent.params.subscribe(params => {

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
      where: {
        companyId: this.companyId
      },
      include: [{
        relation: 'employeeProfileHistories',
        scope: {
          order: 'date DESC',
          limit: 1,
          include: 'profile'
        }
      }]
    })
      .subscribe((employee: Employee) => {
        this.employee = employee;
        if (employee['employeeProfileHistories'] && employee['employeeProfileHistories'][0]) {
          this.profile = employee['employeeProfileHistories'][0].profileStamp;
        }
        this.communicationService.announceMain({
          breadcrumbs: [{
            label: 'Home',
            url: ['main']
          }, {
            label: 'Company',
            url: ['main/company/list']
          }, {
            label: this.company.name,
            url: ['main/company', this.company.id]
          }, {
            label: employee.name,
            url: ['main/company', this.company.id, 'employee', employee.id, 'profile']
          }],
          sidemenus: this.communicationService.menuSet('employee', this.company, this.employee.id)
        });
        console.log(employee);
      });
  }

  updateEmployee() {
    this.employeeApi
      .updateAttributes(this.employee.id, this.employee)
      .subscribe(result => {
        console.log(result);
        this.getEmployee();
      });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  retest() {
    this.employee.doProfileTest = !this.employee.doProfileTest;
    this.updateEmployee();
  }

}
