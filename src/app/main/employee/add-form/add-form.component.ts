import { CommunicationService } from './../../../shared/services/communication.service';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Company } from './../../../shared/sdk/models/Company';
import { Employee } from './../../../shared/sdk/models/Employee';
import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit, OnDestroy {

  public companyId: number;
  public company: Company = new Company();
  public employee: Employee = new Employee();
  public error = '';
  public sub: Subscription;
  public isAddform = true;

  constructor(
    public employeeApi: EmployeeApi,
    public router: Router,
    public route: ActivatedRoute,
    public companyApi: CompanyApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    if (this.router.url.includes('/edit')) {
      this.isAddform = false;
    }

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyId = +params['companyId']; // (+) converts string 'id' to a number

        this.companyApi
          .findById(this.companyId)
          .subscribe((company: Company) => {
            this.company = company;

            if (params['employeeId']) {
              this.employeeApi
                .findById(+params['employeeId'])
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
                      label: company.name,
                      url: ['main/company', company.id]
                    }, {
                      label: 'Edit Employee',
                      url: ['main/company', company.id, 'employee']
                    }, {
                      label: employee.name,
                      url: ['main/company', company.id, 'employee', employee.id, 'editAccount']
                    }],
                    sidemenus: this.communicationService.menuSet('employee', company, employee.id)
                  });
                });
            } else {
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
            }

          });
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit() {

    if (this.isAddform) {
      this.employee.companyId = this.companyId;
      this.employeeApi.upsert(this.employee)
        .subscribe(
        (result: Employee) => {
          console.log(result);
          this.router.navigate([result.id], { relativeTo: this.route });
        },
        error => this.errorCB(error)
        );
    } else {
      this.employeeApi.updateAttributes(this.employee.id, this.employee)
        .subscribe(
        result => {
          console.log(result);
          this.router.navigate(['main/company', this.company.id]);
        },
        error => this.errorCB(error)
        );
    }


  }

  delete() {

    const that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {

      that.employeeApi.deleteById(that.employee.id)
        .subscribe(result => {
          swal(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          ).then(() => that.router.navigate(['main/company', that.company.id]));

        });

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Employee is safe :)',
          'error'
        );
      }
    });


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
