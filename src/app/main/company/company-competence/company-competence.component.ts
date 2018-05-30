import { Company } from './../../../shared/sdk/models/Company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { CommunicationService } from './../../../shared/services/communication.service';
import { CompetenceApi } from './../../../shared/sdk/services/custom/Competence';
import { Competence } from './../../../shared/sdk/models/Competence';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { TableColumns } from './../../../shared/table-columns';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-competence',
  templateUrl: './company-competence.component.html',
  styleUrls: ['./company-competence.component.scss']
})
export class CompanyCompetenceComponent implements OnInit {

  public columns: Array<TableColumns>;
  public competences: Observable<Competence[]>;
  public sub: Subscription;
  public company: Company = new Company();
  public hasBack = false;

  constructor(
    public competenceApi: CompetenceApi,
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.columns = [{
      name: 'name',
      title: 'Competence',
      classes: ['experd-color', 'col-md-2'],
      hasRouter: true
    }, {
      name: 'definition',
      title: 'Definition',
      classes: ['white'],
      hasRouter: true
    }, {
      name: 'definition',
      title: '',
      classes: ['white', 'col-md-1'],
      hasRouter: true
    }];

    this.competences = this.competenceApi.find();
    this.getCompetences();

    this.company.competences = [];
  }

  getCompetences() {

    if (this.router.url.includes('/addCompetence')) {
      this.hasBack = true;
    }

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        console.log('ketemu', params['companyId']);
        this.companyApi
          .findById(+params['companyId'], { include: 'competences' })
          .subscribe((company: Company) => {
            console.log(company);
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
                label: 'Company Competence',
                url: ['main/company', company.id, 'competence']
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

  addCompetence(competence: Competence) {

    if (this.company.competences.find(companyCompetence => companyCompetence.id === competence.id)) {
      this.companyApi.unlinkCompetences(this.company.id, competence.id)
        .subscribe(result => this.getCompetences());
    } else {
      this.companyApi.linkCompetences(this.company.id, competence.id)
        .subscribe(result => this.getCompetences());
    }

  }

  findCompany(competence) {
    return this.company.competences.find(companyCompetence => companyCompetence.id === competence.id) ? true : false;
  }

}
