import { CompetenceSet } from './../../../shared/sdk/models/CompetenceSet';
import { CompetenceSetApi } from './../../../shared/sdk/services/custom/CompetenceSet';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CommunicationService } from './../../../shared/services/communication.service';
import { Competence } from './../../../shared/sdk/models/Competence';
import { TableColumns } from './../../../shared/table-columns';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { Company } from './../../../shared/sdk/models/Company';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-competence-set',
  templateUrl: './competence-set.component.html',
  styleUrls: ['./competence-set.component.scss']
})
export class CompetenceSetComponent implements OnInit {

  public columns: Array<TableColumns>;
  public competences: Observable<CompetenceSet[]>;
  public sub: Subscription;
  public company: Company = new Company();

  constructor(
    public companyApi: CompanyApi,
    public competencesetApi: CompetenceSetApi,
    public communicationService: CommunicationService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.columns = [{
      name: 'name',
      title: 'Competence Set',
      classes: ['experd-color'],
      hasRouter: true
    }];

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyApi
          .findById(+params['companyId'])
          .subscribe((company: Company) => {
            this.competences = this.competencesetApi.find({ where: { companyId: company.id } });
            this.competences.subscribe(result => console.log(result));
            this.company = company;
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
              }, {
                label: 'Competence Set',
                url: ['main/company', company.id, 'competence-set']
              }],
              sidemenus: this.communicationService.menuSet('company', company)
            });
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

  delete(competence) {
    console.log(competence);

    const that = this;
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(function () {
      that.competencesetApi
        .deleteById(competence.id)
        .subscribe(result => {
          swal(
            'Deleted!',
            'Competence Set has been deleted.',
            'success'
          );
          that.competences = that.competencesetApi.find({ where: { companyId: that.company.id } });
        });

    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Competence Set is safe :)',
          'error'
        );
      }
    });

  }

}
