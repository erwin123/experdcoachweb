import { CommunicationService } from './../../../shared/services/communication.service';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Subscription } from 'rxjs/subscription';
import { Company } from './../../../shared/sdk/models/Company';
import { Employee } from './../../../shared/sdk/models/Employee';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  public companyId: number;
  public company: Company = new Company();
  public employee: Employee = new Employee();
  public error = '';
  public sub: Subscription;
  public formTitle: String = 'Profile Edit';

  public today: Date = new Date();
  public dob: Date = new Date();
  public joinDate: Date = new Date();
  // public options: DatePickerOptions;

  public options: DatepickerOptions = {
    minYear: 1945,
    maxYear: this.today.getFullYear(),
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0 // 0 - Sunday, 1 - Monday
  };

  constructor(
    public employeeApi: EmployeeApi,
    public router: Router,
    public route: ActivatedRoute,
    public companyApi: CompanyApi,
    public communicationService: CommunicationService
  ) {
    // this.options = new DatePickerOptions();
    // this.options.minDate = new Date('1945-01-01');
    // this.options.maxDate = this.today;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyId = +params['companyId']; // (+) converts string 'id' to a number

        this.companyApi
          .findById(this.companyId)
          .subscribe((company: Company) => {
            this.company = company;
            this.communicationService.announceMain({
              breadcrumbs: [{
                label: 'Home',
                url: ['main']
              }, {
                label: 'Edit Company',
                url: ['main/company/list']
              }, {
                label: company.name,
                url: ['main/company', company.id]
              }, {
                label: 'Add Employee',
                url: ['main/company', company.id, 'employee', 'add']
              }],
              sidemenus: this.communicationService.menuSet('company', company)
            });
          });
      }

      if (params['employeeId']) {
        this.employeeApi
          .findById(+params['employeeId'])
          .subscribe((employee: Employee) => {
            this.employee = employee;

            if (moment(employee.dob).isValid()) {
              this.dob = moment(employee.dob).toDate();
            }

            if (moment(employee.joinDate).isValid()) {
              this.joinDate = moment(employee.joinDate).toDate();
            }
            // this.employee.dob = new Date(this.employee.dob.toISOString().substring(0, 10))
          });
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {
    this.employee.dob = this.dob;
    this.employee.joinDate = this.joinDate;

    this.employeeApi.updateAttributes(this.employee.id, this.employee)
      .subscribe(
      result => {
        console.log(result);
        this.router.navigate(['../../../'], { relativeTo: this.route });
      },
      error => this.errorCB(error)
      );

  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  errorCB(error) {
    console.log(error);
    this.error = error.message;
  }

  onInputDOB(value: Date): void {
    this.employee.dob = value;
  }

  onInputJoin(value: Date): void {
    this.employee.joinDate = value;
  }

  dobOutput() {
    this.employee.dob = this.dob;
  }

  joinOutput() {
    this.employee.joinDate = this.joinDate;
  }

}
