import { CommunicationService } from './../../../shared/services/communication.service';
import { Company } from './../../../shared/sdk/models/Company';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Observable } from 'rxjs/Observable';
import { TableCompany } from './../../../shared/table-company';
import { TableColumns } from './../../../shared/table-columns';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-company-list-edit',
  templateUrl: './company-list-edit.component.html',
  styleUrls: ['./company-list-edit.component.scss']
})
export class CompanyListEditComponent implements OnInit {

  public columns: Array<TableColumns>;
  public data: Array<TableCompany>;
  public companies: Observable<Company[]>;

  constructor(
    public companyApi: CompanyApi,
    public communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.columns = [{
      name: 'name',
      title: 'Company List',
      classes: ['experd-color'],
      hasRouter: true
    }];

    this.companies = this.companyApi.find();

    this.communicationService.announceMain({
      breadcrumbs: [{
        label: 'Home',
        url: ['main']
      }, {
        label: 'Edit Company',
        url: ['main/company/edit']
      }],
      sidemenus: this.communicationService.menuSet()
    });

  }

  delete(company) {
    console.log(company);

    const that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {
      that.companyApi
        .deleteById(company.id)
        .subscribe(result => {
          swal(
            'Deleted!',
            'Company has been deleted.',
            'success'
          );
          that.companies = that.companyApi.find();
        });
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Company is safe :)',
          'error'
        );
      }
    });

  }

}
