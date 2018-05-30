import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Employee } from './../../../shared/sdk/models/Employee';
import { CommunicationService } from './../../../shared/services/communication.service';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from './../../../shared/sdk/models/Company';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit, OnDestroy {

  public companyId: number;
  public company: Company = new Company();
  public employee: Employee = new Employee();
  public error = '';
  public sub: Subscription;

  constructor(
    public employeeApi: EmployeeApi,
    public router: Router,
    public route: ActivatedRoute,
    public companyApi: CompanyApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyId = +params['companyId']; // (+) converts string 'id' to a number

        this.companyApi
          .findById(this.companyId, {
            include: 'admin'
          })
          .subscribe((company: Company) => {
            this.company = company;
            this.employee = company.admin;
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
              }],
              sidemenus: this.communicationService.menuSet()
            });
          });
      } else {
        this.communicationService.announceMain({
          breadcrumbs: [{
            label: 'Home',
            url: ['main']
          }, {
            label: 'Add Company',
            url: ['main/company/add']
          }],
          sidemenus: this.communicationService.menuSet()
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {
    if (this.companyId) {
      console.log('has company');

      this.employeeApi.updateAttributes(this.employee.id, this.employee)
        .subscribe(
        (result: Employee) => {
          console.log(result);
          this.employeeApi.updateAdminOf(result.id, this.company)
            .subscribe(
            result2 => {
              console.log(result2);
              this.router.navigate(['../../edit'], { relativeTo: this.route });
            },
            error => console.log(error));
        },
        error => console.log(error)
        );
    } else {
      this.employee.username = this.employee.email;
      this.employee.name = this.employee.email;
      this.employeeApi.create(this.employee)
        .subscribe(
        result => {
          console.log(result);
          this.employeeApi.createAdminOf(result.id, this.company)
            .subscribe(
            response => {
              console.log(response);
              this.employeeApi.updateAttributes(result.id, { companyId: response.id }).subscribe();
              this.router.navigate(['../edit'], { relativeTo: this.route });
            },
            error => this.errorCB(error));
        },
        error => this.errorCB(error)
        );
    }
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

}
