import { ActivatedRoute } from '@angular/router';
import { CompanyApi } from './../../../../shared/sdk/services/custom/Company';
import { Competence } from './../../../../shared/sdk/models/Competence';
import { Subscription } from 'rxjs/subscription';
import { CommunicationService } from './../../../../shared/services/communication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-competence-manage',
  templateUrl: './competence-manage.component.html',
  styleUrls: ['./competence-manage.component.scss']
})
export class CompetenceManageComponent implements OnInit, OnDestroy {

  public subs: Subscription[] = [];
  public companyId: number;
  public employeeId: number;
  public companycompetences: Competence[] = [];

  constructor(
    public communicationService: CommunicationService,
    public companyApi: CompanyApi,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subs.push(this.route.parent.parent.params.subscribe(params => {
      console.log(params);

      this.companyId = +params['companyId']; // (+) converts string 'id' to a number
      this.employeeId = +params['employeeId']; // (+) converts string 'id' to a number

      this.subs.push(
        this.companyApi
          .getCompetences(this.companyId)
          .subscribe(companycompetences => {
            console.log(companycompetences);
            this.companycompetences = companycompetences;
          })
      );

    }));
  }

  ngOnDestroy() {
    for (const subscription of this.subs) {
      subscription.unsubscribe();
    }
  }

}
