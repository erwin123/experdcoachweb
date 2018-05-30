import { Company } from './../../../shared/sdk/models/Company';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from './../../../shared/services/communication.service';
import { EmployeeApi } from './../../../shared/sdk/services/custom/Employee';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { Employee } from './../../../shared/sdk/models/Employee';
import { TableCompany } from './../../../shared/table-company';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit, OnDestroy {

  public employees: Observable<Employee[]>;
  public sub: Subscription;
  public companyId: number;
  public company: Company;

  constructor(
    public employeeApi: EmployeeApi,
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute
  ) { }

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
                label: this.company.name,
                url: ['main/company', this.company.id]
              }, {
                label: 'View Team',
                url: ['main/company', this.company.id, 'employee', 'team']
              }],
              sidemenus: this.communicationService.menuSet('company', company)
            });

            this.employees = this.employeeApi.find({
              include: ['team', 'supervisor'],
              where: {
                companyId: this.companyId
              }
            });
          });
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
