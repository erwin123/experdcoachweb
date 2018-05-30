import { CommunicationService } from './../../../shared/services/communication.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyApi } from './../../../shared/sdk/services/custom/Company';
import { Company } from './../../../shared/sdk/models/Company';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  public sub: Subscription;
  public company: Company = new Company();
  public companyId: Number;
  public profile: String = '';

  constructor(
    public companyApi: CompanyApi,
    public communicationService: CommunicationService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['companyId']) {
        this.companyId = params['companyId'];
        console.log('ketemu', params['companyId']);
        this.companyApi
          .findById(+params['companyId'])
          .subscribe((company: Company) => {
            this.company = company;
            this.profile = company['profile'];
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
                label: 'Competence Profile',
                url: ['main/company', company.id, 'introduction']
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

  saveProfile() {
    this.companyApi
      .updateAttributes(this.companyId, {
        profile: this.profile
      })
      .subscribe(
      success => console.log(success),
      error => console.log(error)
      );
  }

}
