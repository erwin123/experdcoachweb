import { CommunicationService } from './../../../shared/services/communication.service';
import { Observable } from 'rxjs/Observable';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Company } from './../../../shared/sdk/models/Company';
import { TableColumns } from './../../../shared/table-columns';
import { TableCompany } from './../../../shared/table-company';
import { Component, OnInit } from '@angular/core';

declare var LoopBackFilter: any;

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public columns: Array<TableColumns>;
  public companies: Observable<Company[]>;

  constructor(
    public companyApi: CompanyApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.columns = [{
      name: 'name',
      title: 'Name',
      classes: ['experd-color'],
      hasRouter: true
    }, {
      name: 'employee',
      title: 'Employee',
      classes: ['white']
    }, {
      name: 'task',
      title: 'Total Task',
      classes: ['white']
    }];

    this.companies = this.companyApi.find({
      counts: 'employees'
    });

    this.communicationService.announceMain({
      breadcrumbs: [{
        label: 'Home',
        url: ['main']
      }, {
        label: 'Edit Company',
        url: ['main/company/list']
      }],
    });
  }

}
